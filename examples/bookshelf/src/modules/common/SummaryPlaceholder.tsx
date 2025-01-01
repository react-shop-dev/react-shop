import { Fragment } from 'react';
import { FlexBox } from 'react-shop-mui/FlexBox';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';

const PLACEHOLDER_COUNT = 4;

export const SummaryPlaceholder = ({ count = PLACEHOLDER_COUNT }: { count?: number }) => {
  return (
    <FlexBox flexDirection="column" gap={0.5}>
      {[...Array(count)].map((_, index) => (
        <Fragment key={index}>
          {index === count - 1 ? <Divider sx={{ my: 1, borderColor: 'grey.300' }} /> : null}
          <FlexBox justifyContent="space-between">
            <Skeleton variant="text" sx={{ fontSize: '16px', width: '15ch' }} />
            <Skeleton variant="text" sx={{ fontSize: '18px', width: '10ch' }} />
          </FlexBox>
        </Fragment>
      ))}
    </FlexBox>
  );
};
