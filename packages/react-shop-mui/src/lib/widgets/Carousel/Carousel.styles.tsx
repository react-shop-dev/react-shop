import Box, { BoxProps } from '@mui/material/Box';
import styled from '@mui/material/styles/styled';
import type { StyledComponent } from '@emotion/styled';

export const StyledCarousel: StyledComponent<BoxProps> = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));
