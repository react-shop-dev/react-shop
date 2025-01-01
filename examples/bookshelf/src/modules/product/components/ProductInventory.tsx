import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import type { Theme } from '@mui/material/styles';
import { inflect } from 'inflection';

type ProductInventoryProps = { count?: number };

export const ProductInventory = (props: ProductInventoryProps) => {
  const { count } = props;

  return count && count <= 5 ? (
    <Chip size="small" label={`Only ${count} ${inflect('item', count)} left`} color="warning" />
  ) : (
    /** add spacer */
    <Box
      sx={(theme: Theme) => ({
        height: theme.spacing(3),
      })}
    />
  );
};
