import type { PaymentIntentError } from '../types';

export function logError(message: string, error?: unknown, level: 'error' | 'warn' = 'error') {
  const params = [
    `[react-shop-stripe]: ${message}`,
    error instanceof Error ? error.message : error,
  ];
  level === 'error' ? console.error(...params) : console.warn(...params);
}

export const getErrorResponse = (error: any): PaymentIntentError => ({
  type: error?.type,
  statusCode: error?.statusCode,
  message: error.raw?.message,
  logUrl: error.raw?.request_log_url,
});
