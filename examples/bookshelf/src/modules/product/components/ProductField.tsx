import { FlexBox } from 'react-shop-mui/FlexBox';
import { NextMuiLink } from 'react-shop-mui/NextMuiLink';
import Box from '@mui/material/Box';
import Typography, { type TypographyProps } from '@mui/material/Typography';

type ProductFieldProps = {
  label: string;
  href?: string;
  value?: string | null;
} & TypographyProps;

export const ProductField = ({ label, value, href, ...rest }: ProductFieldProps) => {
  const renderValue = () => (
    <Typography fontWeight={600} {...rest}>
      {value}
    </Typography>
  );

  return value ? (
    <FlexBox alignItems="center" gap={1}>
      <Box>{label}:</Box>
      {href ? (
        <NextMuiLink href={href} underline="hover" sx={{ color: 'inherit' }}>
          {renderValue()}
        </NextMuiLink>
      ) : (
        renderValue()
      )}
    </FlexBox>
  ) : null;
};
