import { SideMenu } from 'react-shop-mui/SideMenu';
import type { ProductCategory } from 'react-shop-types';
import { fetchList } from '@/lib/data/fetch';
import { formatCategories } from '@/lib/utils/formatCategories';

const CategoryMenu = async () => {
  const { data: categories } = await fetchList<ProductCategory>('categories');

  return <SideMenu data={formatCategories(categories)} />;
};

export default CategoryMenu;
