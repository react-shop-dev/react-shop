import type { ReactNode } from 'react';
import { FieldTitle } from 'react-shop';
import { FlexBox } from 'react-shop-mui/FlexBox';
import Typography from '@mui/material/Typography';

type ProfileFieldProps = {
  label: string;
  children: ReactNode;
};

export const ProfileField = ({ label, children }: ProfileFieldProps) => (
  <FlexBox flexDirection="column">
    <Typography color="grey.600">
      <FieldTitle label={label} />:
    </Typography>
    <Typography fontSize={16}>{children}</Typography>
  </FlexBox>
);
