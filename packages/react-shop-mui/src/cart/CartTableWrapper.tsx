'use client';
import Collapse, { type CollapseProps } from '@mui/material/Collapse';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Box from '@mui/material/Box';
import styled from '@mui/material/styles/styled';

export const CartTableWrapper = ({ children, ...rest }: CollapseProps) => (
  <Collapse {...rest}>
    <StyledCartTableWrapper component={Paper} variant="outlined">
      <Box display="table" width="100%" sx={{ tableLayout: 'fixed' }}>
        {children}
      </Box>
    </StyledCartTableWrapper>
  </Collapse>
);

const PREFIX = 'CartTableWrapper';

const StyledCartTableWrapper = styled(TableContainer, {
  name: PREFIX,
  overridesResolver: (_, styles) => styles.root,
})<{
  component: typeof Paper;
  variant: 'outlined' | 'elevation';
}>({
  marginTop: '1.5rem',
  marginBottom: '2rem',
  overflow: 'auto',
});
