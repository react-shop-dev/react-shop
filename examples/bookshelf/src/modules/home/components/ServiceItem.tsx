'use client';

import type { ReactNode } from 'react';
import { FlexBox } from 'react-shop-mui/FlexBox';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import styled from '@mui/material/styles/styled';

type ServiceItemProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

export const ServiceItem = (props: ServiceItemProps) => {
  const { title, description, icon } = props;

  return (
    <Grid size={{ lg: 4, sm: 12, xs: 12 }}>
      <StyledFlexBox>
        <FlexBox alignItems="center" gap={1.5}>
          {icon}
          <ServiceTitle component="h4">{title}</ServiceTitle>
        </FlexBox>
        <Typography color="inherit">{description}</Typography>
      </StyledFlexBox>
    </Grid>
  );
};

const StyledFlexBox = styled(FlexBox)(({ theme }) => ({
  flexWrap: 'wrap',
  gap: '5px',
  alignItems: 'center',
  borderRadius: '8px',
  padding: '1.5rem',
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.common.white,
  color: theme.palette.grey[700],
  ...theme.applyStyles('dark', {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.grey[500],
  }),
}));

const ServiceTitle = styled(Typography)<{ component: any }>({
  fontWeight: 600,
  fontSize: 20,
  lineHeight: 1.2,
});
