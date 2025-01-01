import { SignInUser } from 'react-shop-auth';
import { STORAGE_USER_PREFIX } from '../constants';
import { storageSetItem } from '../data/storage';

export async function saveCustomer(id: string, data: Omit<SignInUser, 'id'>) {
  await storageSetItem(`${STORAGE_USER_PREFIX}${id}`, data);
}
