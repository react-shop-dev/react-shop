'use client';

import Typography from '@mui/material/Typography';
import { SearchToolbarClasses, StyledSearchToolbar } from './SearchToolbar.styles';
import SearchTotal from './SearchTotal';

const SearchToolbar = ({ query }: { query?: string }) => {
  return (
    <StyledSearchToolbar variant="regular">
      <Typography component="h5" className={SearchToolbarClasses.label}>
        Searching for &quot;{query}&quot;
      </Typography>
      <SearchTotal className={SearchToolbarClasses.total} />
    </StyledSearchToolbar>
  );
};

export default SearchToolbar;
