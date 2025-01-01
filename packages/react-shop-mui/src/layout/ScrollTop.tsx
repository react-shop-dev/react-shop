'use client';
import { MouseEvent } from 'react';
import Fab, { FabProps } from '@mui/material/Fab';
import styled from '@mui/material/styles/styled';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Fade from '@mui/material/Fade';

export type ScrollTopProps = FabProps;

export const ScrollTop = (props: ScrollTopProps) => {
  const { sx = [], ...rest } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector(
      '#shop-back-to-top-anchor',
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
    }
  };

  return (
    <Fade in={trigger}>
      <StyledFab
        color="primary"
        size="small"
        onClick={handleClick}
        aria-label="scroll back to top"
        sx={[{ position: 'fixed', bottom: 16, right: 16 }, ...(Array.isArray(sx) ? sx : [sx])]}
        {...rest}
      >
        <KeyboardArrowUpIcon />
      </StyledFab>
    </Fade>
  );
};

const PREFIX = 'ShopScrollTop';

const StyledFab = styled(Fab, { name: PREFIX, overridesResolver: (_, styles) => styles.root })(
  ({ theme }) => ({
    position: 'fixed',
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  }),
);
