import { forwardRef } from 'react';
import Zoom, { ZoomProps } from '@mui/material/Zoom';

export const ZoomDialog = forwardRef<JSX.Element, ZoomProps>((props, ref) => {
  const { timeout = 320, ...rest } = props;
  return <Zoom ref={ref} timeout={timeout} {...rest} />;
});

ZoomDialog.displayName = 'ZoomDialog';
