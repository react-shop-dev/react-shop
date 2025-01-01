import { useListContext } from 'react-shop';
import Typography, { TypographyProps } from '@mui/material/Typography';

const SearchTotal = (props: TypographyProps) => {
  const { total } = useListContext();

  return (
    <Typography color="grey.500" {...props}>
      {total && total > 0 ? total : 'No'} results found
    </Typography>
  );
};

export default SearchTotal;
