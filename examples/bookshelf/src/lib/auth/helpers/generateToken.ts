import { storageRemoveItem, storageSetItem } from '@/lib/data/storage';
import { v4 as uuidv4 } from 'uuid';
import { getTokenByEmail } from './getTokenByEmail';

const defaultExpires = new Date(new Date().getTime() + 3600 * 1000); // 1 HOUR

export const generateToken = async (key: string, email: string, expires: Date = defaultExpires) => {
  const token = uuidv4();

  const existingToken = await getTokenByEmail(key, email);

  if (existingToken) {
    await storageRemoveItem(`${key}:${email}`);
  }

  const verificarionToken = {
    email,
    token,
    expires,
  };

  await storageSetItem(`${key}:${email}`, verificarionToken);

  return verificarionToken;
};
