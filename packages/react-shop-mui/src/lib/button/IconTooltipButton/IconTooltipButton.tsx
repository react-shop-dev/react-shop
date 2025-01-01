'use client';
import { forwardRef, ReactElement } from 'react';
import { useTranslate } from 'react-shop/translate';
import { useThemeProps } from '@mui/material/styles';
import MuiIconButton, {
  type IconButtonProps as MuiIconButtonProps,
} from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export type IconTooltipButtonProps = {
  label?: string;
  children?: ReactElement;
  ariaLabel?: string;
} & MuiIconButtonProps;

export const IconTooltipButton = forwardRef<HTMLButtonElement, IconTooltipButtonProps>(
  (inProps, ref) => {
    const props = useThemeProps({ props: inProps, name: 'ShopIconTooltipButton' });

    const {
      children,
      size,
      component: Button = MuiIconButton,
      label,
      disabled,
      className,
      ...rest
    } = props;

    const translate = useTranslate();

    const translatedLabel = typeof label === 'string' ? translate(label, { _: label }) : label;

    return label && !disabled ? (
      <Tooltip title={translatedLabel}>
        <Button ref={ref} aria-label={translatedLabel} className={className} size={size} {...rest}>
          {children}
        </Button>
      </Tooltip>
    ) : (
      <Button ref={ref} disabled={disabled} className={className} size={size} {...rest}>
        {children}
      </Button>
    );
  },
);

IconTooltipButton.displayName = 'ShopIconTooltipButton';
