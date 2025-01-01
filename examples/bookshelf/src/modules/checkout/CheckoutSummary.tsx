import Paper from '@mui/material/Paper';
import { CheckoutTitle } from './components/CheckoutTitle';
import { CheckoutTotal } from './components/CheckoutTotal';
import SummaryList from './templates/SummaryList';

const CheckoutSummary = () => {
  return (
    <Paper elevation={0} sx={{ px: 3, py: 4.5 }}>
      <CheckoutTitle title="Your Order" />
      <SummaryList />
      <CheckoutTotal />
    </Paper>
  );
};

export default CheckoutSummary;
