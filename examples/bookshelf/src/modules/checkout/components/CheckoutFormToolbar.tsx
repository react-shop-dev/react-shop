import Avatar from '@mui/material/Avatar';
import Toolbar from '@mui/material/Toolbar';
import { CheckoutTitle } from './CheckoutTitle';

export type CheckoutFormToolbarProps = { title: string; step?: number };

export const CheckoutFormToolbar = (props: CheckoutFormToolbarProps) => {
  const { step, title } = props;

  return (
    <Toolbar sx={{ mb: 1.5 }}>
      {step ? <Avatar>{step}</Avatar> : null}
      <CheckoutTitle title={title} sx={{ ml: step ? 2 : 0 }} />
    </Toolbar>
  );
};
