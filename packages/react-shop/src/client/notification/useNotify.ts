import { useCallback } from 'react';
import { notificationEmitter } from './notificationEmitter';
import { NotificationOptions, NotificationType } from './NotificationContext';

export const useNotify = () => {
  const notify = useCallback(
    (
      message: NotificationType['message'],
      options: NotificationOptions & { type?: NotificationType['type'] } = {},
    ) => {
      const { type = 'info', ...notificationOptions } = options;
      notificationEmitter.emit('notify', { message, type, notificationOptions });
    },
    [],
  );

  return notify;
};
