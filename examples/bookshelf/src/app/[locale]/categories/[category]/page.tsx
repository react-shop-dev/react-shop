import { cloneElement, Fragment } from 'react';
import { GetListBase, Title } from 'react-shop';
import type { ProductCategory, Region } from 'react-shop-types';
import { getCountryCodes } from 'react-shop/functions';
import { notFound } from 'next/navigation';
import { fetchList } from '@/lib/data/fetch';
import CategoryProducts from '@/modules/categories/templates/CategoryProducts';
import { CategoryFilter } from '@/modules/common/CategoryFilter';
import type { StoreItemType } from '@/types';

type Params = Promise<{ category?: string }>;

export async function generateStaticParams() {
  const { data: categories } = await fetchList<ProductCategory>('categories');
  const { data: regions } = await fetchList<Region>('regions');

  if (!categories) {
    return [];
  }

  const countryCodes = regions?.map(getCountryCodes).flat() || [];
  const categoriesHandles = categories.map(category => category.handle);

  return countryCodes
    ?.map(countryCode =>
      categoriesHandles.map(handle => ({
        locale: countryCode,
        category: handle,
      })),
    )
    .flat();
}

const CategoryPage = async (props: { params: Params }) => {
  const params = await props.params;

  const { data: categories } = await fetchList<ProductCategory>('categories');
  // Fakerest cannot get one record by handle, only by id
  const category = categories?.find(category => category.handle === params.category);

  if (!category) {
    notFound();
  }

  const filter = <CategoryFilter type={category.metadata?.type as StoreItemType} />;

  return (
    <Fragment>
      <Title title={category?.name} />
      <GetListBase filter={{ category_id: category.id }} disableSyncWithLocation={false}>
        <CategoryProducts aside={cloneElement(filter, { sticky: true })} drawer={filter} />
      </GetListBase>
    </Fragment>
  );
};

export default CategoryPage;
