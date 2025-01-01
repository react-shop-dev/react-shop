import { createContext, ReactNode } from 'react';

export interface NotificationOptions {
  autoHideDuration?: number;
  multiline?: boolean;
  messageArgs?: any;
  [key: string]: any;
}

export type NotificationType = {
  readonly open?: boolean;
  readonly id?: any;
  readonly message: string | ReactNode;
  readonly type: 'success' | 'error' | 'info' | 'warning';
  readonly notificationOptions?: NotificationOptions;
  entered?: boolean;
};

export type NotificationContextType = {
  hideNotification: (key: string) => void;
  resetNotifications: () => void;
  notifications: NotificationType[];
};

const defaultNotificationContext = {
  showNotification: () => {},
  hideNotification: () => {},
  resetNotifications: () => {},
  notifications: [],
};

export const NotificationContext = createContext<NotificationContextType>(
  defaultNotificationContext,
);

NotificationContext.displayName = 'NotificationContext';
