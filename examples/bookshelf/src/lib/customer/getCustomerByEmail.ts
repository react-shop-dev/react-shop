import type { Customer } from 'react-shop-types';
import { storage } from '@/storage.config';
import { STORAGE_USER_PREFIX } from '../constants';
import { generateCustomerID } from './generateCustomerID';

export async function getCustomerByEmail(email: string): Promise<Customer | null> {
  const id = generateCustomerID(email);

  try {
    const value = await storage.getItem(`${STORAGE_USER_PREFIX}${id}`);
    if (isCustomer(value)) {
      return value;
    }
    return null;
  } catch {
    return null;
  }
}

function isCustomer(value: unknown): value is Customer {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  const customer = value as Customer;
  return typeof customer.email === 'string';
}
