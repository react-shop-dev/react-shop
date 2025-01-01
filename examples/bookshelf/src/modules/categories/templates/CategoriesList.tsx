import { Empty } from 'react-shop-mui/Empty';
import type { ProductCategory } from 'react-shop-types';
import Grid from '@mui/material/Grid2';
import { fetchList } from '@/lib/data/fetch';
import { CategoryHandle } from '@/lib/utils/formatCategories';
import CategoryListItem from '../components/CategoryListItem';

const CategoriesList = async () => {
  const { data: categories } = await fetchList<ProductCategory>('categories');

  return categories?.length ? (
    <Grid container spacing={3}>
      {transformCategories(categories).map(item => (
        <CategoryListItem key={item.id} item={item} />
      ))}
    </Grid>
  ) : (
    <Empty message="No categories found" />
  );
};

const emoji: { [key in CategoryHandle]: string } = {
  [CategoryHandle.history]: '🗿',
  [CategoryHandle.arts]: '🎭',
  [CategoryHandle.fantasy]: '🐉',
  [CategoryHandle.science]: '🧬',
  [CategoryHandle.biography]: '🕯️',
  [CategoryHandle.fiction]: '🛸',
  [CategoryHandle.romance]: '💝',
  [CategoryHandle.education]: '📚',
  [CategoryHandle.detective]: '🕵🏻',
  [CategoryHandle.horror]: '🧛🏼‍♂️',
  [CategoryHandle.comics]: '🃏',
  [CategoryHandle.accessories]: '🏷️',
  [CategoryHandle['board-games']]: '🎲',
  [CategoryHandle.toys]: '🤖',
};

const isValidCategoryHandle = (handle = ''): handle is keyof typeof emoji => {
  return handle in emoji;
};

const transformCategories = (data: ProductCategory[]) => {
  return data
    .filter(category => !category.category_children_ids?.length)
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(category => ({
      ...category,
      icon: isValidCategoryHandle(category.handle) ? emoji[category.handle] : undefined,
    }));
};

export default CategoriesList;
