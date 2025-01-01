import { GetListBase } from 'react-shop';
import { ProductSlider } from 'react-shop-mui/ProductSlider';
import BookIcon from '@mui/icons-material/MenuBook';

const News = () => {
  return (
    <GetListBase
      perPage={8}
      sort={{ field: 'published', order: 'DESC' }}
      filter={{ type: { value: 'book' } }}
    >
      <ProductSlider icon={<BookIcon />} title="News" />
    </GetListBase>
  );
};

export default News;
