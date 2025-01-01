import { useGetList } from 'react-shop';
import { CatalogMenu } from 'react-shop-mui/CatalogMenu';
import type { ProductCategory } from 'react-shop-types';
import { usePathname } from 'next/navigation';
import createSvgIcon from '@mui/material/utils/createSvgIcon';
import { formatCategories } from '@/lib/utils/formatCategories';
import catalogIcon from '@icons/CatalogIcon.svg';

const skippedPathnames = ['/', '/categories'];

export const StoreCatalog = () => {
  const pathname = usePathname();

  const { data, isPending, error } = useGetList<ProductCategory>(
    'categories',
    {
      pagination: { page: 1, perPage: 100 },
      sort: { field: 'name', order: 'ASC' },
    },
    { refetchOnWindowFocus: false },
  );

  if (skippedPathnames.includes(pathname) || error) {
    return null;
  }

  const categorories = formatCategories(data);

  return categorories.length ? (
    <CatalogMenu icon={CatalogIcon} data={categorories} isLoading={isPending} href="/categories" />
  ) : null;
};

const CatalogIcon = createSvgIcon(
  <svg>
    <use href={`${catalogIcon.src}#catalog-icon`} />
  </svg>,
  'CatalogIcon',
);
