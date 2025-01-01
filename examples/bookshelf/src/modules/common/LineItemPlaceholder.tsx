import { Fragment } from 'react';
import { FlexBox } from 'react-shop-mui/FlexBox';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import { StyledLineItem, StyledPriceHolder } from './LineItem.styles';

type LineItemPlaceholderProps = {
  count?: number;
  inAccount?: boolean;
};

export const LineItemPlaceholder = ({ count = 1, inAccount = false }: LineItemPlaceholderProps) =>
  [...Array(count)].map((_, index) => (
    <Fragment key={index}>
      <StyledLineItem>
        <FlexBox alignItems="center" gap={2}>
          <Skeleton variant="rounded" width={60} height={60} sx={{ minWidth: 60 }} />
          <Box>
            <Skeleton variant="text" sx={{ width: '20ch', fontSize: '1rem' }} />
            <Skeleton variant="text" sx={{ width: '16ch', fontSize: '1rem' }} />
          </Box>
        </FlexBox>
        <FlexBox gap={2} alignItems="center" flex={1} justifyContent="flex-end">
          <StyledPriceHolder gap={1}>
            <Skeleton variant="rectangular" width="75%" sx={{ maxWidth: '100px' }} />
            <Skeleton variant="rectangular" width="75%" sx={{ maxWidth: '100px' }} />
          </StyledPriceHolder>
          {inAccount ? <Skeleton variant="rounded" width={150} height={36} /> : null}
        </FlexBox>
      </StyledLineItem>
      {index !== count - 1 ? <Divider sx={{ my: 1, borderColor: 'grey.300' }} /> : null}
    </Fragment>
  ));
