import { Suspense } from 'react';
import { PageView } from 'react-shop-mui/PageView';
import CategoriesSkeleton from '@/modules/categories/components/CategoriesSkeleton';
import CategoriesList from '@/modules/categories/templates/CategoriesList';

const CategoriesPage = () => {
  return (
    <PageView sx={{ pb: 6, bgcolor: 'grey.100' }}>
      <Suspense fallback={<CategoriesSkeleton />}>
        <CategoriesList />
      </Suspense>
    </PageView>
  );
};

export default CategoriesPage;
