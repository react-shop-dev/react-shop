'use client';

import { useShowContext } from 'react-shop';
import { Empty } from 'react-shop-mui/Empty';
import type { Address, Customer } from 'react-shop-types';
import { AccountListPlaceholder } from '@/modules/account/skeletons/AccountListPlaceholder';
import { compareDesc } from 'date-fns';
import { AddressBookItem } from '../components/AddressBookItem';

export const AdressBook = () => {
  const { record: customer, error, isPending } = useShowContext<Customer>();

  if (isPending) {
    return <AccountListPlaceholder />;
  }

  if (error) {
    return null;
  }

  return customer?.shipping_addresses?.length ? (
    customer?.shipping_addresses
      .sort((a, b) => compareDesc(a.created_at ?? new Date(), b.created_at ?? new Date()))
      .map((item: Address) => <AddressBookItem key={item.id} item={item} />)
  ) : (
    <Empty message="Your address book is empty" />
  );
};
