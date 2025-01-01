import CardContent from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
import { FlexBox } from '@views/FlexBox';
import { FlexBetween } from '@views/FlexBetween';
import { ProductCard } from '../ProductCard';
import { ProductCardClasses } from '../ProductCard/ProductCard.styles';

export const ProductGridPlaceholder = () => (
  <ProductCard className={ProductCardClasses.grid}>
    <Skeleton
      variant="rectangular"
      animation="wave"
      className={ProductCardClasses.picture}
      width="100%"
    />
    <FlexBox flexDirection="column" flex={1}>
      <CardContent className={ProductCardClasses.gridContent}>
        <Skeleton variant="text" animation="wave" sx={{ fontSize: '1.6rem' }} />
        <FlexBetween>
          <Skeleton variant="text" animation="wave" sx={{ fontSize: '1rem' }} width="50%" />
          <Skeleton variant="circular" animation="wave" width={30} height={30} />
        </FlexBetween>
      </CardContent>
    </FlexBox>
  </ProductCard>
);
