import EventEmitter from 'eventemitter3';
import { NotificationType } from './NotificationContext';

export const notificationEmitter = new EventEmitter<{
  notify: (event: NotificationType) => void;
}>();
