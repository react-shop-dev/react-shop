import { useTranslate } from 'react-shop/translate';
import { styled } from '@mui/material/styles';
import Typography, { type TypographyProps } from '@mui/material/Typography';
import { COLOR_SCHEME_DARK } from 'src/theme/constants';

export type ForgotPasswordLink = TypographyProps & {
  handleClick: () => void;
};

export const ForgotPasswordLink = (props: ForgotPasswordLink) => {
  const {
    handleClick,
    title = 'rs.auth.forgot_password',
    color = 'grey.600',
    variant = 'caption',
    sx = {},
    ...rest
  } = props;

  const translate = useTranslate();

  return (
    <StyledTypography
      variant={variant}
      color={color}
      onClick={handleClick}
      sx={{ cursor: 'pointer', ...sx }}
      {...rest}
    >
      {translate(title)}
    </StyledTypography>
  );
};

const StyledTypography = styled(Typography)(({ theme }) => ({
  ...theme.applyStyles(COLOR_SCHEME_DARK, {
    color: 'white',
  }),
}));
