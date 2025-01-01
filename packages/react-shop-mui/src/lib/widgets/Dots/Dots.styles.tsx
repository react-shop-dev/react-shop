import { FlexBox, FlexBoxProps } from '@views/FlexBox';
import styled from '@mui/material/styles/styled';
import type { StyledComponent } from '@emotion/styled';

export const StyledDots: StyledComponent<FlexBoxProps> = styled(FlexBox)({
  position: 'absolute',
  bottom: '10px',
  left: '50%',
  transform: 'translateX(-50%)',
});
