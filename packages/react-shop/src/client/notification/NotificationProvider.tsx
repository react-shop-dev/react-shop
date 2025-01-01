import { ReactNode, useState, useMemo, useCallback, useEffect } from 'react';
import { NotificationContext, NotificationType } from './NotificationContext';
import { notificationEmitter } from './notificationEmitter';

export interface NotificationContextProviderProps {
  maxStack?: number;
  children: ReactNode;
}

export const NotificationContextProvider = ({
  children,
  maxStack = 10,
}: NotificationContextProviderProps) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  const showNotification = useCallback(
    (notification: NotificationType) => {
      const id = Date.now() + Math.random();
      const item = {
        id,
        open: true,
        entered: false,
        ...notification,
      };
      if (notifications.length > 0) {
        setNotifications(prevItems => [item, ...prevItems.filter(item => !item.entered)]);
        return;
      }
      setNotifications(prevItems => {
        const newNotifications = [...prevItems, item];
        if (newNotifications.length > maxStack) {
          newNotifications.shift();
        }
        return newNotifications;
      });
    },
    [maxStack, notifications],
  );

  const hideNotification = useCallback((key: string) => {
    setNotifications(prevItems => prevItems.filter(item => item.id !== key));
  }, []);

  const resetNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  useEffect(() => {
    const listener = (notification: NotificationType) => {
      showNotification(notification);
    };

    notificationEmitter.on('notify', listener);
    return () => {
      notificationEmitter.off('notify', listener);
    };
  }, [showNotification]);

  const contextValue = useMemo(
    () => ({
      notifications,
      hideNotification,
      resetNotifications,
    }),
    [notifications],
  );

  return (
    <NotificationContext.Provider value={contextValue}>{children}</NotificationContext.Provider>
  );
};
