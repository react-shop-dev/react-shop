'use client';

import { useState } from 'react';
import { Button } from 'react-shop-mui/Button';
import AddIcon from '@mui/icons-material/Add';
import { AddressModal } from '../templates/AddressModal';

export const AddAddressButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button label="rs.action.create" onClick={() => setOpen(true)}>
        <AddIcon />
      </Button>
      {open ? <AddressModal dialogTitle="Add Address" onClose={() => setOpen(false)} /> : null}
    </>
  );
};
