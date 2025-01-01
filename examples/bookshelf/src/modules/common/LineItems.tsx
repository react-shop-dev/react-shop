import { RecordContextProvider } from 'react-shop';
import type { LineItem as LineItemType } from 'react-shop-types';
import Divider from '@mui/material/Divider';
import { LineItem } from './LineItem';

const LineItems = ({
  data = [],
  inAccount,
}: {
  data?: LineItemType[] | null;
  inAccount?: boolean;
}) => {
  return data?.length
    ? data
        .sort((a, b) => a.title.localeCompare(b.title))
        .map((item, index) => (
          <RecordContextProvider key={item.id} value={item}>
            <LineItem item={item} inAccount={inAccount} />
            {index !== data.length - 1 ? (
              <Divider sx={{ my: 0.5, borderColor: 'grey.300' }} />
            ) : null}
          </RecordContextProvider>
        ))
    : null;
};

export default LineItems;
