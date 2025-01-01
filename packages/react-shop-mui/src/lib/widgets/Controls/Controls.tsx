'use client';
import type { ComponentType, MouseEvent } from 'react';
import type { ControlProps } from 'nuka-carousel';
import isFunction from 'lodash/isFunction';
import clsx from 'clsx';
import MuiIconButton, { type IconButtonProps } from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import type { Theme } from '@mui/material/styles';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const IconButtonControl = ({
  size = 'medium',
  color,
  className,
  icon: Icon,
  handleClick,
  disabled,
  hideOnSmallDevice = true,
  sx = {},
  ...rest
}: IconButtonProps & {
  hideOnSmallDevice?: boolean;
  icon: ComponentType<SvgIconProps>;
  handleClick: (event: MouseEvent<HTMLButtonElement>) => void;
}) => (
  <MuiIconButton
    color={color}
    size={size}
    onClick={handleClick}
    disabled={disabled}
    className={clsx('mui-shop-carousel-controls', className)}
    // @ts-ignore spread SxProps to function
    sx={(theme: Theme) => ({
      top: '-4px',
      ...(!color && {
        backgroundColor: 'rgba(255,255,255,0.7)',
        color: 'black',
        '&:hover': {
          color: 'white',
          backgroundColor: 'rgba(0,0,0,0.4)',
        },
      }),
      ...(hideOnSmallDevice && {
        [theme.breakpoints.down('lg')]: {
          display: 'none',
        },
      }),
      ...sx,
    })}
    {...rest}
  >
    <Icon htmlColor="inherit" fontSize={size} />
  </MuiIconButton>
);

export const PrevArrowButton = ({
  id,
  size,
  color,
  previousSlide,
  previousDisabled,
  onUserNavigation,
  icon = ArrowBackIosNewIcon,
  hideOnSmallDevice,
  sx,
}: ButtonControlProps) => {
  return (
    <IconButtonControl
      {...{ id, size, color, icon, hideOnSmallDevice }}
      aria-label="Previous"
      handleClick={event => {
        if (event.defaultPrevented) return;
        isFunction(onUserNavigation) && onUserNavigation(event);
        isFunction(previousSlide) && previousSlide();
      }}
      disabled={previousDisabled}
      sx={{
        left: '4px',
        ...sx,
      }}
    />
  );
};

export const NextArrowButton = ({
  id,
  size,
  color,
  nextSlide,
  nextDisabled,
  onUserNavigation,
  icon = ArrowForwardIosIcon,
  hideOnSmallDevice,
  sx,
}: ButtonControlProps) => (
  <IconButtonControl
    {...{ id, size, color, icon, hideOnSmallDevice }}
    aria-label="Next"
    handleClick={event => {
      if (event.defaultPrevented) return;
      isFunction(onUserNavigation) && onUserNavigation(event);
      isFunction(nextSlide) && nextSlide();
    }}
    disabled={nextDisabled}
    sx={{
      right: '4px',
      ...sx,
    }}
  />
);

export type ButtonControlProps = Partial<ControlProps> &
  IconButtonProps & {
    icon?: ComponentType<SvgIconProps>;
    hideOnSmallDevice?: boolean;
  };
