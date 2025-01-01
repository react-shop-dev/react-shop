import styled from '@mui/material/styles/styled';
import { FlexRowCenter } from '@views/FlexRowCenter';
import type { StyledComponent } from '@emotion/styled';
import { FlexBoxProps } from '@views/FlexBox';
import { COLOR_SCHEME_DARK } from 'src/theme/constants';

export const StyledImagePlacolder: StyledComponent<FlexBoxProps> = styled(FlexRowCenter)(
  ({ theme }) => ({
    height: '100%',
    alignItems: 'center',
    fontSize: '3em',
    opacity: 0.5,
    backgroundColor: theme.palette.common.white,
    ...theme.applyStyles(COLOR_SCHEME_DARK, {
      backgroundColor: theme.palette.common.black,
    }),
  }),
);
