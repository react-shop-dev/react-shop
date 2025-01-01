import type { ComponentType } from 'react';
import { useInStock, useTranslate, useRecordContext, useProductInterface } from 'react-shop';
import type { Product, ProductVariant } from 'react-shop-types';
import CheckIcon from '@mui/icons-material/Check';
import QuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import Typography, { type TypographyProps } from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import type { SxProps } from '@mui/material/styles';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import { StyledProductStatus } from './ProductStatus.styles';

export const ProductStatus = (props: ProductStatusProps) => {
  const { status: statusKey } = useProductInterface();

  const {
    source = statusKey,
    variant,
    iconProps,
    sx = {},
    label: Label = DefaultLabel,
    StockIcon = CheckIcon,
    OutStockIcon = QuantityLimitsIcon,
  } = props;

  const record = useRecordContext<Product>();
  const inStock = useInStock(variant ? [variant] : undefined);
  const translate = useTranslate();

  if (!record) {
    throw new Error('ProductStatus: Record is missing');
  }

  const Icon = inStock ? StockIcon : OutStockIcon;
  const title = inStock ? 'rs.product.inStock' : 'rs.product.unavailable';
  const translatedTitle = translate(title, { _: title });

  const renderIcon = () => (
    <Icon fontSize="small" color={inStock ? 'success' : 'warning'} {...iconProps} />
  );

  return (
    <StyledProductStatus sx={sx}>
      {Label !== false ? (
        <>
          {renderIcon()}
          <Label status={record[source]} color={inStock ? 'default' : 'grey.600'} inStock={inStock}>
            {translatedTitle}
          </Label>
        </>
      ) : (
        <Tooltip title={translatedTitle}>{renderIcon()}</Tooltip>
      )}
    </StyledProductStatus>
  );
};

const DefaultLabel = ({
  status: _status,
  inStock: _inStock,
  ...rest
}: TypographyProps & { inStock?: boolean; status?: string }) => <Typography {...rest} />;

export type ProductStatusProps = {
  source?: string;
  sx?: SxProps;
  iconProps?: SvgIconProps;
  variant?: ProductVariant;
  label?: ComponentType<TypographyProps & { inStock?: boolean; status?: string }> | false;
  StockIcon?: ComponentType<SvgIconProps>;
  OutStockIcon?: ComponentType<SvgIconProps>;
};
