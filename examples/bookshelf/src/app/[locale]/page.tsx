import { Aside } from 'react-shop-mui/Aside';
import { PageView } from 'react-shop-mui/PageView';
import CategoryMenu from '@/modules/common/CategoryMenu';
import HomeCarousel from '@/modules/home/HomeCarousel';
import LatestViewed from '@/modules/home/LatestViewed';
import News from '@/modules/home/News';
import Services from '@/modules/home/Services';
import TopSellers from '@/modules/home/TopSellers';

export default function HomePage() {
  return (
    <PageView
      aside={
        <Aside sticky inDrawer>
          <CategoryMenu />
        </Aside>
      }
    >
      <HomeCarousel />
      <Services />
      <News />
      <TopSellers />
      <LatestViewed />
    </PageView>
  );
}
