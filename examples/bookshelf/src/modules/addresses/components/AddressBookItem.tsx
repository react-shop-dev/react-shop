import type { Address } from 'react-shop-types';
import Typography from '@mui/material/Typography';
import { AccountListItem } from '@/modules/account/components/AccountListItem';
import OrderTitle from '@/modules/order/components/OrderTitle';
import { AddressActions } from '../templates/AddressActions';

export const AddressBookItem = ({ item }: { item: Address }) => {
  const name = [item?.first_name, item?.last_name].filter(Boolean).join(' ');

  return (
    <AccountListItem actions={<AddressActions id={item.id} />}>
      <OrderTitle sx={{ textTransform: 'capitalize' }}>{name}</OrderTitle>
      <Typography sx={{ textTransform: 'uppercase' }}>{item.country_code}</Typography>
      <Typography>{item.city}</Typography>
      <Typography>{item.phone}</Typography>
      <Typography>{item.address_1}</Typography>
    </AccountListItem>
  );
};
