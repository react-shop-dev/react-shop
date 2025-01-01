import crypto from 'crypto';

export const generateCustomerID = (inputString: string) => {
  const hash = crypto.createHash('sha256');
  hash.update(inputString, 'utf-8');
  return hash.digest('hex');
};
