'use client';

import { useRedirect } from 'react-shop';
import { Button } from 'react-shop-mui/Button';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

type ProfileActionsProps = {
  isEdit?: boolean;
};

export const ProfileActions = ({ isEdit }: ProfileActionsProps) => {
  const redirect = useRedirect();

  return isEdit ? (
    <Button
      label="Cancel"
      size="small"
      variant="contained"
      color="inherit"
      onClick={() => redirect({ query: {} })}
    >
      <VisibilityIcon />
    </Button>
  ) : (
    <Button
      label="Edit"
      size="small"
      variant="contained"
      color="inherit"
      onClick={() => redirect({ query: { edit: true } })}
    >
      <EditIcon />
    </Button>
  );
};
