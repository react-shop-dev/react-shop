import { Breadcrumbs } from 'react-shop-mui/Breadcrumbs';
import { PageToolbar } from 'react-shop-mui/PageToolbar';
import { PageView, PageViewProps } from 'react-shop-mui/PageView';
import { ProductView } from 'react-shop-mui/ProductView';
import { CategorySortButton } from '../components/CategorySortButton';

const CategoryProducts = (props: PageViewProps) => {
  return (
    <PageView
      {...props}
      toolbar={<PageToolbar sortButton={<CategorySortButton />} />}
      breadcrumbs={<Breadcrumbs />}
      sx={{ mb: 6 }}
    >
      <ProductView allowSwitchView />
    </PageView>
  );
};

export default CategoryProducts;
