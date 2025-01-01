import { useRedirect } from 'react-shop';
import { IconTooltipButton } from 'react-shop-mui/IconTooltipButton';
import type { Identifier } from 'react-shop-types';
import EditIcon from '@mui/icons-material/Edit';
import { RemoveAddressButton } from '../components/RemoveAddressButton';

export const AddressActions = ({ id }: { id: Identifier }) => {
  const redirect = useRedirect();

  return (
    <>
      <IconTooltipButton label="rs.action.edit" onClick={() => redirect({ query: { id } })}>
        <EditIcon />
      </IconTooltipButton>
      <RemoveAddressButton id={id} />
    </>
  );
};
