'use client';

import { useState, useRef, type ReactElement, Fragment } from 'react';
import { useTranslate } from 'react-shop/translate';
import { ButtonProps } from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper, { type PaperProps } from '@mui/material/Paper';
import Popper, { type PopperProps } from '@mui/material/Popper';
import Tooltip from '@mui/material/Tooltip';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { Theme } from '@mui/material/styles/createTheme';
import { StyledSplitButton, StyledSplitButtonWrapper } from './SplitButton.styles';

export const SplitButton = (props: SplitButtonProps) => {
  const {
    label,
    ariaLabel,
    icon = defaultIcon,
    endIcon = defaultEndIcon,
    selected,
    popperProps,
    paperProps,
    children,
    ...rest
  } = props;

  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement | null>(null);

  const translate = useTranslate();
  const isMediaMatch = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'));

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = (event?: Event) => {
    if (anchorRef.current && anchorRef.current.contains(event?.target as HTMLElement)) {
      return;
    }
    setOpen(false);
  };

  return (
    <Fragment>
      {isMediaMatch ? (
        <Tooltip title={typeof label === 'string' ? translate(label) : 'Open'}>
          <StyledSplitButton
            ref={anchorRef}
            onClick={handleToggle}
            aria-label={ariaLabel}
            aria-expanded={open ? 'true' : undefined}
            {...defaultProps}
            {...rest}
          >
            {icon}
          </StyledSplitButton>
        </Tooltip>
      ) : null}
      <StyledSplitButtonWrapper gap={1}>
        {label !== false ? (
          <Typography whiteSpace="pre">
            {typeof label === 'string' ? translate(label, { _: label }) : label}:
          </Typography>
        ) : null}
        <StyledSplitButton
          ref={anchorRef}
          endIcon={endIcon}
          onClick={handleToggle}
          aria-expanded={open ? 'true' : undefined}
          aria-label={ariaLabel}
          {...defaultProps}
          {...rest}
        >
          {selected}
        </StyledSplitButton>
      </StyledSplitButtonWrapper>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        placement="bottom-end"
        sx={{
          zIndex: 100,
        }}
        {...popperProps}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper {...paperProps}>
              <ClickAwayListener onClickAway={handleClose}>
                {typeof children === 'function' ? children({ handleClose }) : children}
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Fragment>
  );
};

const defaultProps = {
  color: 'inherit',
  variant: 'outlined',
  size: 'small',
  disableRipple: true,
  'aria-haspopup': 'menu',
} as const;

type ChildrenType = ({ handleClose }: { handleClose: (event?: Event) => void }) => ReactElement;

export type SplitButtonProps = Omit<ButtonProps, 'children'> & {
  label?: ReactElement | string | false;
  icon?: ReactElement;
  selected?: string | number;
  children: ChildrenType | ReactElement;
  popperProps?: PopperProps;
  paperProps?: PaperProps;
  ariaLabel?: string;
};

const defaultIcon = <MenuIcon fontSize="small" />;
const defaultEndIcon = <ArrowDropDownIcon fontSize="small" />;
