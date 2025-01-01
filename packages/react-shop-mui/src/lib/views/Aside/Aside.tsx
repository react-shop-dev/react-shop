'use client';
import type { ReactNode } from 'react';
import type { CardProps } from '@mui/material/Card';

export interface AsideProps {
  sticky?: boolean;
  inDrawer?: boolean;
  cardProps?: CardProps;
  children?: ReactNode;
}

export const Aside = ({ children }: AsideProps) => {
  return <>{children}</>;
};
