import { getShopConfig } from 'react-shop/functions';
import Typography from '@mui/material/Typography';

export const Copyright = () => {
  const { version } = getShopConfig();

  return (
    <Typography variant="body2" align="center">
      &copy; {new Date().getFullYear()}. {version ? `Version: ${version}.` : null} All rights
      reserved
    </Typography>
  );
};
