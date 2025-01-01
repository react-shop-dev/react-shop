import { storage } from '@/storage.config';
import { Token } from '@/types/auth';

export const getTokenByEmail = async (key: string, email: string): Promise<Token | null> => {
  const value = await storage.getItem(`${key}:${email}`);
  if (isToken(value)) {
    return value;
  }
  return null;
};

function isToken(value: unknown): value is Token {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  const token = value as Token;
  return typeof token.email === 'string' && typeof token.token === 'string';
}
