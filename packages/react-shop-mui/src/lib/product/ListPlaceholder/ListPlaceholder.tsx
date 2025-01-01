import CardContent from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
import { ProductCard } from '../ProductCard';
import { ProductCardClasses } from '../ProductCard/ProductCard.styles';

export const ProductListPlaceholder = () => (
  <ProductCard className={ProductCardClasses.list}>
    <Skeleton variant="rectangular" animation="wave" height="100%" />
    <CardContent className={ProductCardClasses.listContent}>
      <Skeleton variant="text" animation="wave" width="40%" sx={{ fontSize: '1.6rem' }} />
      <Skeleton variant="text" animation="wave" width="25%" sx={{ fontSize: '1rem' }} />
      <Skeleton variant="text" animation="wave" width="140px" height="36px" />
    </CardContent>
  </ProductCard>
);
