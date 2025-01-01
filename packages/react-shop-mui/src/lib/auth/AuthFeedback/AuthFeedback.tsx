import Alert, { type AlertProps } from '@mui/material/Alert';

export const AuthFeedback = ({
  severity,
  message,
  sx = {},
  ...rest
}: AlertProps & { message?: string }) => {
  return message ? (
    <Alert severity={severity} sx={sx} {...rest}>
      {message}
    </Alert>
  ) : null;
};
