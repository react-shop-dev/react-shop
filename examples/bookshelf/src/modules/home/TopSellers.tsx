import { GetListBase } from 'react-shop';
import { ProductSlider } from 'react-shop-mui/ProductSlider';
import StarIcon from '@mui/icons-material/StarBorder';

const TopSellers = () => {
  return (
    <GetListBase
      perPage={8}
      sort={{ field: 'sales', order: 'DESC' }}
      filter={{ type: { value: 'book' } }}
    >
      <ProductSlider icon={<StarIcon />} title="Top Sellers" />
    </GetListBase>
  );
};

export default TopSellers;
