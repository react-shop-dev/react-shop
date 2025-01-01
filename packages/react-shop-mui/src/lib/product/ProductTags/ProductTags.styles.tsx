import Chip, { ChipProps } from '@mui/material/Chip';
import styled from '@mui/material/styles/styled';
import type { StyledComponent } from '@emotion/styled';

export const StyledChip: StyledComponent<ChipProps> = styled(Chip)({
  fontSize: '10px',
  color: 'white',
  fontWeight: 500,
});
