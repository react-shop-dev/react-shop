import { NextLink } from 'react-shop';
import type { ProductCategory } from 'react-shop-types';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { StyledCard } from './CategoryListItem.styles';

const CategoryListItem = ({ item }: CategoryListItemProps) => {
  return (
    <Grid size={{ xl: 3, lg: 4, md: 4, sm: 6, xs: 12 }}>
      <NextLink href={`categories/${item.handle}`}>
        <StyledCard>
          {<Typography fontSize={40}>{item.icon || '👀'}</Typography>}
          <Box>
            <Typography component="h3" fontSize={16} fontWeight={600}>
              {item.name}
            </Typography>
            <Typography color="grey.600">{item.description}</Typography>
          </Box>
        </StyledCard>
      </NextLink>
    </Grid>
  );
};

type CategoryWithIcon = ProductCategory & {
  icon?: string;
};

type CategoryListItemProps = {
  item: CategoryWithIcon;
};

export default CategoryListItem;
