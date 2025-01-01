'use client';
import { ComponentType, useEffect } from 'react';
import { Form, useShopConfig } from 'react-shop';
import { useRouter } from 'next/navigation';
import styled from '@mui/material/styles/styled';
import type { SxProps } from '@mui/material/styles';
import { SearchBarMobile } from './SearchBarMobile';
import { SearchInput, SearchInputProps } from './SearchInput';

export const SearchBar = (props: SearchBarProps) => {
  const { input: Input = SearchInput, icon, sx, ...rest } = props;

  const config = useShopConfig();
  const router = useRouter();

  useEffect(() => {
    router.prefetch(config?.paths?.search);
  }, [router]);

  return (
    <StyledSearchBar sx={sx}>
      <Form>
        <SearchBarMobile icon={icon}>
          <Input icon={icon} {...rest} />
        </SearchBarMobile>
        <Input icon={icon} className={StyledSearchBarClasses.input} {...rest} />
      </Form>
    </StyledSearchBar>
  );
};

export type SearchBarProps = SearchInputProps & {
  input?: ComponentType;
  sx?: SxProps;
};

const PREFIX = 'ShopSearchBarRoot';

const StyledSearchBarClasses = {
  input: `${PREFIX}-input`,
};

const StyledSearchBar = styled('div', {
  name: PREFIX,
  overridesResolver: (_, styles) => styles.root,
})(({ theme }) => ({
  position: 'relative',
  width: '100%',
  flex: '1 1 0',
  margin: '0 auto',
  color: theme.palette.grey[700],
  [theme.breakpoints.up('md')]: {
    maxWidth: '50%',
  },
  [theme.breakpoints.down('md')]: {
    [`& .${StyledSearchBarClasses.input}`]: {
      display: 'none',
    },
  },
  '& .MuiInputBase-root': {
    color: 'inherit',
  },
  '& form .MuiAutocomplete-root': {
    width: 'auto',
    flexGrow: 1,
  },
  '& form .MuiAutocomplete-root .MuiAutocomplete-inputRoot': {
    padding: 0,
    height: '46px',
    paddingLeft: theme.spacing(2),
  },
  '& .mui-shop-search-button': {
    borderRadius: '0 100px 100px 0',
  },
}));
