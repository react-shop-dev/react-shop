import { useNotify, useShowContext, useUpdate } from 'react-shop';
import { IconTooltipButton } from 'react-shop-mui/IconTooltipButton';
import type { Customer, Identifier } from 'react-shop-types';
import DeleteIcon from '@mui/icons-material/Delete';

export const RemoveAddressButton = ({ id }: { id: Identifier }) => {
  const [update, { isPending }] = useUpdate();
  const notify = useNotify();
  const { record: customer, resource } = useShowContext<Customer>();

  const handleClick = () => {
    const shipping_addresses = customer?.shipping_addresses?.filter(address => address.id !== id);

    update(
      resource,
      {
        id: customer?.id,
        previousData: customer,
        data: {
          shipping_addresses,
        },
      },
      {
        onSuccess() {
          notify('Address Book updated', { type: 'success' });
        },
        onError() {
          notify('Cannot delete Address', { type: 'error' });
        },
      },
    );
  };

  return (
    <IconTooltipButton onClick={handleClick} disabled={isPending} label="rs.action.delete">
      <DeleteIcon />
    </IconTooltipButton>
  );
};
