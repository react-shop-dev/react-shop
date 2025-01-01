'use client';

import type { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';

const ModalImage = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  return (
    <Modal
      open
      disablePortal
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      onClose={() => router.back()}
      sx={{
        display: 'flex',
        p: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <>{children}</>
    </Modal>
  );
};

export default ModalImage;
