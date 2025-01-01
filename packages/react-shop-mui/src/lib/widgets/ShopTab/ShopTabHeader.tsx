import type { ReactElement, ReactNode } from 'react';
import { useTranslate } from 'react-shop/translate';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import queryString from 'query-string';
import Tab, { type TabProps } from '@mui/material/Tab';

export interface ShopTabHeaderProps extends Omit<TabProps, 'children'> {
  className?: string;
  hidden?: boolean;
  intent?: 'header' | 'content';
  icon?: ReactElement;
  label: string | ReactElement;
  value?: string | number;
  count?: ReactNode;
  syncWithLocation?: boolean;
}

export const ShopTabHeader = (props: ShopTabHeaderProps) => {
  const { label, value, icon, count, onChange, className, syncWithLocation, ...rest } = props;

  const translate = useTranslate();
  const searchParams = useSearchParams();

  const propsForLink = {
    component: Link,
    href: {
      pathname: `${value}`,
      query: queryString.parse(searchParams.toString()),
      hash: 'tabs',
    },
  };

  let tabLabel = typeof label === 'string' ? translate(label, { _: label }) : label;

  if (count !== undefined) {
    tabLabel = (
      <span>
        {tabLabel} {count}
      </span>
    );
  }

  return (
    <Tab
      {...rest}
      id={`tabheader-${value}`}
      label={tabLabel}
      value={value}
      icon={icon}
      onChange={onChange}
      className={className}
      aria-controls={`tabpanel-${value}`}
      {...(syncWithLocation ? propsForLink : {})}
    />
  );
};
