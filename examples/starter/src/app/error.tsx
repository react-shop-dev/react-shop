'use client';

import { ErrorHandler, ErrorHandlerProps } from 'react-shop-mui/ErrorHandler';

export default function ErrorPage(props: ErrorHandlerProps) {
  return <ErrorHandler {...props} mode={process.env.NODE_ENV} />;
}
