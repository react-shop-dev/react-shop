import { useNotificationContext } from 'react-shop';
import NotificationItem from '../NotificationItem';
import { StyledNotification } from './Notification.styles';

export const Notification = () => {
  const { notifications = [], hideNotification } = useNotificationContext();

  const handleClose = (id: string) => {
    hideNotification(id);
  };

  if (notifications.length === 0) return null;

  const item = notifications[0];

  return (
    <StyledNotification>
      <NotificationItem key={item.id} item={item} handleClose={() => handleClose(item.id)} />
    </StyledNotification>
  );
};
