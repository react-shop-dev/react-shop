import { Fragment } from 'react';
import { TitleBox } from 'react-shop-mui/TitleBox';
import { getViewedProducts } from 'react-shop/server';
import HistoryIcon from '@mui/icons-material/History';
import { LatestViewedClient } from './components/LatestViewedClient';

const LatestViewed = async () => {
  const ids = await getViewedProducts();

  return ids?.length ? (
    <Fragment>
      <TitleBox title="Latest Viewed" icon={<HistoryIcon />} />
      <LatestViewedClient ids={ids} />
    </Fragment>
  ) : null;
};

export default LatestViewed;
