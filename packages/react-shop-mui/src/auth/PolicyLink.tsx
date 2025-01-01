import Typography, { type TypographyProps } from '@mui/material/Typography';
import { NextMuiLink } from '@common/NextMuiLink';

export type PolicyLinkProp = TypographyProps & {
  termsLink?: string;
  policyLink?: string;
};

export const PolicyLink = (props: PolicyLinkProp) => {
  const {
    termsLink = '/terms',
    policyLink = '/policy',
    color = 'grey.600',
    variant = 'caption',
    sx = {},
    ...rest
  } = props;

  return (
    <Typography variant={variant} color={color} component="p" sx={{ py: 1, ...sx }} {...rest}>
      By creating an account, you agree to{' '}
      <NextMuiLink href={policyLink}>Privacy Policy</NextMuiLink> and{' '}
      <NextMuiLink href={termsLink}>Terms of Use.</NextMuiLink>
    </Typography>
  );
};
