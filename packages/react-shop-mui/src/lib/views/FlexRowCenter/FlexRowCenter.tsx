import { FlexBox, type FlexBoxProps } from '@views/FlexBox';

type FlexRowCenterProps = FlexBoxProps;

export const FlexRowCenter = ({ children, ...props }: FlexRowCenterProps) => (
  <FlexBox justifyContent="center" alignItems="center" {...props}>
    {children}
  </FlexBox>
);
