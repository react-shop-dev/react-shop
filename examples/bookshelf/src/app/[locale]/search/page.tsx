import { InfiniteList } from 'react-shop';
import { InfinitePagination } from 'react-shop-mui/InfinitePagination';
import { PageView } from 'react-shop-mui/PageView';
import { ProductView } from 'react-shop-mui/ProductView';
import Toolbar from '@/modules/search/SearchToolbar';

type SearchParams = Promise<{ q?: string }>;

export default async function SearchPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;

  return (
    <InfiniteList filter={{ q: searchParams?.q }}>
      <PageView toolbar={<Toolbar query={searchParams?.q} />}>
        <ProductView pagination={<InfinitePagination />} />
      </PageView>
    </InfiniteList>
  );
}
