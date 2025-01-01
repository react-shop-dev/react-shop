import { FlexBox } from 'react-shop-mui/FlexBox';
import Skeleton from '@mui/material/Skeleton';
import { LineItemPlaceholder } from '@/modules/common/LineItemPlaceholder';
import { SummaryPlaceholder } from '@/modules/common/SummaryPlaceholder';
import { StyledOrderTopbar } from '../components/OrderTopbar.styles';
import { OrderShowLayout } from '../templates/OrderShowLayout';

export const OrderShowPlaceholder = () => (
  <OrderShowLayout
    title="Loading..."
    topbar={
      <StyledOrderTopbar>
        <Skeleton variant="rounded" animation="wave" width="20%" height={24} />
        <Skeleton variant="rounded" animation="wave" width="20%" height={24} />
        <Skeleton variant="rounded" animation="wave" width="20%" height={24} />
      </StyledOrderTopbar>
    }
    items={<LineItemPlaceholder count={2} inAccount />}
  >
    <FlexBox flexDirection="column" gap={2}>
      {[...Array(5)].map((_, index) => (
        <Skeleton key={index} variant="rectangular" animation="wave" width="100%" height={20} />
      ))}
    </FlexBox>
    <SummaryPlaceholder />
  </OrderShowLayout>
);
