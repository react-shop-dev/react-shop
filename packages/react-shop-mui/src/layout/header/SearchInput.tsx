import { MouseEvent, useCallback, ComponentType } from 'react';
import { useRedirect, useShopConfig, useTranslate } from 'react-shop';
import InputAdornment from '@mui/material/InputAdornment';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import styled from '@mui/material/styles/styled';
import { SearchInputAutcomplete, SearchInputAutocompleteProps } from './SearchAutocomplete';
import { Button } from '@button/Button';

export type SearchInputProps = SearchInputAutocompleteProps & {
  label?: string;
  source?: string;
  icon?: ComponentType<SvgIconProps>;
  redirectTo?: string;
};

export const SearchInput = (props: SearchInputProps) => {
  const config = useShopConfig();
  const translate = useTranslate();

  const {
    label = 'rs.action.search',
    redirectTo = config?.paths?.search,
    icon: Icon = SearchIcon,
    source = 'q',
    className,
    ...rest
  } = props;

  const redirect = useRedirect();

  const handleClick = useCallback((event: MouseEvent) => {
    event.preventDefault();
    const value = (document.getElementsByName(source)[0] as HTMLInputElement)?.value;
    redirect({ to: redirectTo, query: { q: value } });
  }, []);

  return (
    <StyledSearchInputRoot className={className}>
      <SearchInputAutcomplete
        source={source}
        TextFieldProps={{
          fullWidth: true,
          placeholder: 'Searching for...',
          InputProps: {
            sx: { overflow: 'hidden', color: 'inherit', borderRadius: '100px 0 0 100px' },
            'aria-label': 'search',
            startAdornment: (
              <InputAdornment position="start">
                <Icon color="inherit" />
              </InputAdornment>
            ),
          },
        }}
        {...rest}
      />
      <Button
        type="button"
        onClick={handleClick}
        color="primary"
        variant="contained"
        disableElevation
        className="mui-shop-search-button"
        label={translate(label, { _: 'Search' })}
      />
    </StyledSearchInputRoot>
  );
};

const StyledSearchInputRoot = styled(Box)({
  display: 'flex',
  position: 'relative',
});
