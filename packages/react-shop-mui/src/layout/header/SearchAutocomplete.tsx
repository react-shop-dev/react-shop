'use client';
import { HTMLAttributes, useState } from 'react';
import type { Product } from 'react-shop-types';
import { useAutocomplete, useNavigationEvent, useProductInterface } from 'react-shop';
import get from 'lodash/get';
import { FilterOptionsState } from '@mui/base/useAutocomplete';
import type { SxProps } from '@mui/material/styles';
import { AutocompleteInput, AutocompleteInputProps } from '../../lib/input/AutocompleteInput';
import { FlexRowCenter } from '@views/FlexRowCenter';
import { MuiLazyImage } from '@picture/MuiLazyImage';
import { ProductLink } from '../../lib/product/ProductLink';

export interface SearchInputAutocompleteProps
  extends Partial<Omit<AutocompleteInputProps, 'source'>> {
  label?: string;
  source?: string;
  reference?: string;
  sx?: SxProps;
}

export const SearchInputAutcomplete = (props: SearchInputAutocompleteProps) => {
  const { title, resource, thumbnail } = useProductInterface();

  const {
    source = 'q',
    optionText: optionTextProp,
    optionValue,
    reference = resource,
    ...rest
  } = props;

  const [open, setOpen] = useState(false);

  const optionText = optionTextProp || title;

  const { options, onSearch, fetchError, isLoading } = useAutocomplete({
    source,
    reference,
    optionText,
    optionValue,
    enableGetChoices: (value: string) => value.length > 0,
    queryOptions: {
      onSettled: () => {
        setOpen(true);
      },
    },
  });

  useNavigationEvent(() => {
    open && setOpen(false);
  });

  return (
    <AutocompleteInput
      open={open}
      source={source}
      helperText={false}
      optionText={optionText}
      optionValue={optionValue}
      popupIcon={null}
      clearOnBlur={false}
      label={false}
      {...{ isLoading, fetchError, onSearch }}
      filterOptions={(options: any[], _state: FilterOptionsState<any>) => options}
      onClose={() => {
        setOpen(false);
      }}
      renderOption={(props: HTMLAttributes<HTMLLIElement>, record: Product) => {
        const titleRecord = get(record, title);
        return (
          <li key={record?.id} {...props} style={{ cursor: 'default' }}>
            <ProductLink record={record} href={{ query: { [source]: titleRecord } }}>
              <FlexRowCenter>
                <MuiLazyImage
                  width="50"
                  height="75"
                  src={get(record, thumbnail)}
                  sx={{ mr: 1.5 }}
                />
                <span>{titleRecord}</span>
              </FlexRowCenter>
            </ProductLink>
          </li>
        );
      }}
      {...rest}
      choices={options}
    />
  );
};
