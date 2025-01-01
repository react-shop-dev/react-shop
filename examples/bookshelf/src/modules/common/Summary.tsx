import type { ReactNode } from 'react';
import { FlexBox, FlexBoxProps } from 'react-shop-mui/FlexBox';
import { PriceField } from 'react-shop-mui/PriceField';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

export type SummaryProps = {
  total?: number | null;
  subtotal?: number | null;
  tax_total?: number | null;
  shipping_total?: number | null;
} & Omit<FlexBoxProps, 'children'>;

const Summary = (props: SummaryProps) => {
  const { total, subtotal, tax_total, shipping_total, ...rest } = props;

  return (
    <FlexBox flexDirection="column" gap={0.5} {...rest}>
      <SummaryField
        label={
          <Tooltip title="Value excluding taxes and shipping">
            <span>Sub Total*</span>
          </Tooltip>
        }
        value={Number(subtotal)}
      />
      <SummaryField label="Shipping" value={Number(shipping_total)} />
      {tax_total != null ? <SummaryField label="Taxes" value={Number(tax_total)} /> : null}
      <Divider sx={{ my: 1, borderColor: 'grey.300' }} />
      <FlexBox justifyContent="space-between">
        <Typography fontWeight="semi-bold" fontSize="18px">
          Total
        </Typography>
        <PriceField component="strong" fontSize="18px" value={Number(total)} />
      </FlexBox>
    </FlexBox>
  );
};

export default Summary;

const SummaryField = ({ label, value }: { label: ReactNode; value: number }) => (
  <FlexBox justifyContent="space-between">
    <Typography>{label}:</Typography>
    <PriceField color="grey.600" value={value} />
  </FlexBox>
);
