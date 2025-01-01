import Avatar, { AvatarProps } from '@mui/material/Avatar';
import AccountCircle from '@mui/icons-material/AccountCircle';

export type AccountAvatarProps = Omit<AvatarProps, 'src'> & {
  src?: string | null;
};

export const AccountAvatar = (props: AccountAvatarProps) => {
  const { src, alt, children = defaultIcon, sx, ...rest } = props;

  if (typeof src === 'string') {
    return <Avatar src={src} alt={alt} sx={sx} {...rest} />;
  }

  if (typeof children === 'string') {
    return (
      <Avatar sx={{ color: 'white', bgcolor: stringToColor(children), ...sx }} {...rest}>
        {children.charAt(0)}
      </Avatar>
    );
  }

  return (
    <Avatar sx={sx} {...rest}>
      {children}
    </Avatar>
  );
};

const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
};

const defaultIcon = <AccountCircle />;
