import type { Identifier, Customer } from 'react-shop-types';
import { MOCK_USER_EMAIL } from '../constants';
import { fetchOneRecord } from '../data/fetch';
import { getCustomerByEmail } from './getCustomerByEmail';

export const demoUserCheck = (email?: string | null) => email === MOCK_USER_EMAIL;

export const getCustomerFromDB = async (id?: Identifier, email?: string | null) => {
  if (!id && !email) {
    return null;
  }
  if (id && demoUserCheck(email)) {
    const result = await fetchOneRecord<Customer>('customers', { id });
    return result.data;
  } else if (email) {
    return getCustomerByEmail(email);
  }
};
