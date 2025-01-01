import { useTranslate } from 'react-shop/translate';
import Tab from '@mui/material/Tab';
import type { SxProps } from '@mui/material/styles';

export type AuthBoxTitleProps = {
  title: string;
  sx?: SxProps;
};

export const AuthBoxTitle = (props: AuthBoxTitleProps) => {
  const { title, sx = {} } = props;

  const translate = useTranslate();

  return (
    <Tab
      label={translate(title)}
      disableRipple
      component="div"
      sx={{ width: '100%', mb: 2, cursor: 'default', ...sx }}
    />
  );
};
