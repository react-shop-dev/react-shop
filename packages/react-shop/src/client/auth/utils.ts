export const getErrorMessage = (error: any, defaultMessage: string) =>
  typeof error === 'string'
    ? error
    : typeof error === 'undefined' || !error.message
      ? defaultMessage
      : error.message;
