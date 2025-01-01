import type { ReactNode } from 'react';
import { FlexBox } from 'react-shop-mui/FlexBox';
import Typography from '@mui/material/Typography';
import { SxProps } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles/createTheme';

const OrderReviewItem = (props: OrderReviewItemProps) => {
  const { icon, node, label, direction = 'row', ...rest } = props;

  return node ? (
    <FlexBox
      justifyContent="space-between"
      sx={(theme: Theme) => ({
        flexDirection: direction,
        [theme.breakpoints.down('sm')]: {
          flexDirection: 'column',
        },
      })}
      {...rest}
    >
      <Typography color="grey.600">{label}</Typography>
      <Typography fontSize={16} lineHeight={1.2}>
        {icon ? <span style={{ verticalAlign: 'top' }}>{icon}&nbsp;</span> : null}
        {node}
      </Typography>
    </FlexBox>
  ) : null;
};

type OrderReviewItemProps = {
  node?: ReactNode;
  label: ReactNode;
  icon?: ReactNode;
  sx?: SxProps;
  direction?: 'row' | 'column';
};

export default OrderReviewItem;
