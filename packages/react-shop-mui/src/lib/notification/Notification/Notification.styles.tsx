import type { HTMLAttributes } from 'react';
import styled from '@mui/material/styles/styled';
import type { StyledComponent } from '@emotion/styled';

export const StyledNotification: StyledComponent<HTMLAttributes<HTMLElement>> = styled('div')({
  pointerEvents: 'none',
  zIndex: 1500,
  maxHeight: '100%',
  height: 'auto',
  width: 'auto',
});
