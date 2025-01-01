import styled from '@mui/material/styles/styled';
import { FlexBox, FlexBoxProps } from '@views/FlexBox';
import type { StyledComponent } from '@emotion/styled';

const PREFIX = 'ShopCollectionList';

export const StyledDefaultList: StyledComponent<FlexBoxProps> = styled(FlexBox, {
  name: PREFIX,
  overridesResolver: (_, styles) => styles.root,
})(({ theme }) => ({
  flexDirection: 'column',
  marginBottom: '2rem',
  paddingBottom: '1rem',
  gap: theme.spacing(3),
  containerType: 'inline-size',
}));
