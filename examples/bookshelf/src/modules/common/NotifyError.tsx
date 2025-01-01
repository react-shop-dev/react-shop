'use client';

import { useLayoutEffect } from 'react';
import { useNotify } from 'react-shop';

const NotifyError = ({ message }: { message: string }) => {
  const notify = useNotify();

  useLayoutEffect(() => {
    notify(message, { type: 'error' });
  }, [message, notify]);

  return null;
};

export default NotifyError;
