'use client';
import type { ReactNode } from 'react';
import { FilterForm } from 'react-shop';
import type { CardProps } from '@mui/material/Card';

export interface FilterProps {
  children: ReactNode;
  cardProps?: CardProps;
}

export const Filter = (props: FilterProps) => {
  const { children } = props;

  return <FilterForm>{children}</FilterForm>;
};
