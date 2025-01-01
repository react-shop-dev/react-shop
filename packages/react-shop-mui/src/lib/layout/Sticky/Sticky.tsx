'use client';

import { type ReactElement, cloneElement, useRef } from 'react';
import { isBrowser } from 'react-shop/functions';
import clsx from 'clsx';
import type { SxProps } from '@mui/material/styles';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import { StyledSticky } from './Sticky.styles';

type UseScrollTriggerOptions = {
  disableHysteresis?: boolean;
  target?: Node | Window;
  threshold?: number;
  sx?: SxProps;
};

export type StickyProps = { children: ReactElement } & UseScrollTriggerOptions;

export const Sticky = (props: StickyProps) => {
  const { sx = {}, children, ...rest } = props;

  const elementRef = useRef<HTMLDivElement>(null);

  const trigger = useScrollTrigger({
    threshold: isBrowser() ? elementRef.current?.offsetHeight : 120,
    disableHysteresis: true,
    ...rest,
  });

  return (
    <StyledSticky
      ref={elementRef}
      sx={{ paddingTop: trigger ? `${elementRef.current?.offsetHeight}px` : 0, ...sx }}
    >
      <Box className={clsx({ hold: !trigger, fixed: trigger })}>
        {cloneElement(children, {
          elevation: trigger ? 5 : 0,
          fixed: trigger,
        })}
      </Box>
    </StyledSticky>
  );
};
