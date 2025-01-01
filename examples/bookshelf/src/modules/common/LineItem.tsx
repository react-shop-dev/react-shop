import { Button } from 'react-shop-mui/Button';
import { FlexBox } from 'react-shop-mui/FlexBox';
import { MuiLazyImage } from 'react-shop-mui/MuiLazyImage';
import { PriceField } from 'react-shop-mui/PriceField';
import { ProductLink } from 'react-shop-mui/ProductLink';
import { ProductTitle } from 'react-shop-mui/ProductTitle';
import type { LineItem as LineLineType } from 'react-shop-types';
import ModeIcon from '@mui/icons-material/Mode';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { StyledLineItem, StyledPriceHolder } from './LineItem.styles';

type LineItemProps = { item: LineLineType; inAccount?: boolean };

export const LineItem = (props: LineItemProps) => {
  const { item, inAccount } = props;
  return (
    <StyledLineItem>
      <FlexBox alignItems="center" gap={2}>
        {item.thumbnail ? (
          <MuiLazyImage
            src={item.thumbnail}
            objectFit="cover"
            width={60}
            height={70}
            sx={{ borderRadius: 1, minWidth: 60 }}
          />
        ) : null}
        <Box>
          <ProductTitle />
          {item.variant.title ? (
            <Typography color="grey.600">Format: {item.variant.title}</Typography>
          ) : null}
        </Box>
      </FlexBox>
      <FlexBox gap={2} alignItems="center" justifyContent="flex-end">
        <StyledPriceHolder gap={0.5}>
          <Box>
            <strong>{Number(item.quantity)}</strong>&nbsp;x&nbsp;
            <PriceField color="grey.600" value={item.unit_price} />
          </Box>
          <PriceField color="grey.600" value={Number(item.quantity) * Number(item.unit_price)} />
        </StyledPriceHolder>
        {inAccount ? (
          <ProductLink id={item.product_id as string} href={{ hash: 'tabs' }}>
            <Button startIcon={<ModeIcon />} label="Write a Review" sx={{ whiteSpace: 'nowrap' }} />
          </ProductLink>
        ) : null}
      </FlexBox>
    </StyledLineItem>
  );
};
