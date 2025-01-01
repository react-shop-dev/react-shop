import { FlexBox, type FlexBoxProps } from '@views/FlexBox';

export type FlexBetweenProps = FlexBoxProps;

export const FlexBetween = ({ children, ...props }: FlexBetweenProps) => (
  <FlexBox justifyContent="space-between" alignItems="center" {...props}>
    {children}
  </FlexBox>
);
