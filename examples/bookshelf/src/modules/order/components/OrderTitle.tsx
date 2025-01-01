import Typography, { TypographyProps } from '@mui/material/Typography';

const OrderTitle = ({ children, ...rest }: TypographyProps) => {
  return (
    <Typography component="h5" fontSize={16} fontWeight={600} gutterBottom {...rest}>
      {children}
    </Typography>
  );
};

export default OrderTitle;
