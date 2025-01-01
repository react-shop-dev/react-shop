'use client';

import type { ReactElement, ElementType } from 'react';
import { useTranslate } from 'react-shop/translate';
import isString from 'lodash/isString';
import { useThemeProps } from '@mui/material/styles';
import type { UrlObject } from 'url';
import { type ButtonProps as MuiButtonProps } from '@mui/material/Button';
import { StyledButton } from './Button.styles';

export const Button = <RootComponent extends ElementType = 'button'>(
  inProps: ButtonProps<RootComponent>,
) => {
  const props = useThemeProps({ props: inProps, name: 'ShopButton' });

  const {
    className,
    label,
    color = 'primary',
    variant = 'contained',
    disabled,
    alignIcon = 'left',
    children,
    ariaLabel: ariaLabelProp,
    ...rest
  } = props;

  const translate = useTranslate();

  const translatedLabel = isString(label) ? translate(label, { _: label }) : label;
  const ariaLabel = ariaLabelProp || isString(label) ? translatedLabel : '';

  return (
    <StyledButton
      variant={variant}
      color={color}
      className={className}
      disabled={disabled}
      aria-label={ariaLabel}
      startIcon={alignIcon === 'left' && children ? children : undefined}
      endIcon={alignIcon === 'right' && children ? children : undefined}
      {...rest}
    >
      {translatedLabel}
    </StyledButton>
  );
};

interface Props<RootComponent extends ElementType> {
  label?: string | ReactElement;
  children?: ReactElement;
  alignIcon?: 'left' | 'right';
  component?: RootComponent;
}

export type ButtonProps<RootComponent extends ElementType = 'button'> = Props<RootComponent> &
  Omit<MuiButtonProps<RootComponent>, 'href'> & {
    href?: UrlObject | string;
    ariaLabel?: string;
  };
