'use client';
import { ChangeEvent, memo, useMemo } from 'react';
import { useTranslate, useListFilterContext, Form } from 'react-shop';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { TextInput, TextInputProps } from '../../input';

export interface FilterLiveSearchProps extends Omit<TextInputProps, 'source'> {
  source?: string;
  label?: string;
}

export const FilterLiveSearch = memo((props: FilterLiveSearchProps) => {
  const { source = 'q', label = 'rs.action.search' } = props;

  const { filterValues, setFilters } = useListFilterContext();
  const translate = useTranslate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target) {
      setFilters({ ...filterValues, [source]: event.target.value });
    } else {
      const { [source]: _, ...filters } = filterValues;
      setFilters(filters);
    }
  };

  const initialValues = useMemo(() => ({ [source]: filterValues[source] }), [filterValues, source]);

  const onSubmit = () => undefined;

  return (
    <Form onSubmit={onSubmit} defaultValues={initialValues}>
      <TextInput
        resettable
        onChange={handleChange}
        placeholder={translate(label)}
        source={source}
        helperText={false}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon color="disabled" />
              </InputAdornment>
            ),
          },
        }}
      />
    </Form>
  );
});

FilterLiveSearch.displayName = 'FilterLiveSearch';
