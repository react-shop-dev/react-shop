import type { ReactElement, ReactNode } from 'react';
import Stack, { type StackProps } from '@mui/material/Stack';
import type { TabProps as MuiTabProps } from '@mui/material/Tab';
import { ShopTabHeader } from './ShopTabHeader';

export interface ShopTabProps
  extends Omit<StackProps, 'color'>,
    Omit<MuiTabProps, 'children' | 'classes'> {
  intent?: 'header' | 'content';
  icon?: ReactElement;
  contentClassName?: string;
  label: string | ReactElement;
  value?: string | number;
  hidden?: boolean;
  children?: ReactNode;
  count?: ReactNode;
  syncWithLocation?: boolean;
  path?: string;
}

export const ShopTab = (props: ShopTabProps) => {
  const {
    intent,
    label,
    value,
    hidden,
    icon,
    count,
    onChange,
    className,
    contentClassName,
    syncWithLocation,
    children,
    ...rest
  } = props;

  const renderHeader = () => (
    <ShopTabHeader
      label={label}
      value={value}
      onChange={onChange}
      icon={icon}
      count={count}
      className={className}
      syncWithLocation={syncWithLocation}
    />
  );

  const renderContent = () => (
    <Stack
      id={`tabpanel-${value}`}
      className={contentClassName}
      sx={hidden ? hiddenStyle : null}
      aria-labelledby="tabheader"
      aria-hidden={hidden || undefined}
      {...rest}
    >
      {children}
    </Stack>
  );

  return intent === 'header' ? renderHeader() : renderContent();
};

const hiddenStyle = { display: 'none' };
