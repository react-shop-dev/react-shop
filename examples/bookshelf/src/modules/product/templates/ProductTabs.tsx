'use client';

import type { ShopTabProps } from 'react-shop-mui/ShopTab';
import { ShopTabs } from 'react-shop-mui/ShopTabs';
import { useParams } from 'next/navigation';

export type ProductTabsProps = { tabs: Array<ShopTabProps> };

export const ProductTabs = ({ tabs }: ProductTabsProps) => {
  const params = useParams();

  return (
    <ShopTabs syncWithLocation>
      {tabs.map(({ label, icon, path, children, ...rest }, index) => (
        <ShopTabs.Tab
          key={index}
          label={label}
          icon={icon}
          path={params?.tabs ? path : index === 0 ? '' : `${params?.slug}/${path}`}
          {...rest}
        >
          {children}
        </ShopTabs.Tab>
      ))}
    </ShopTabs>
  );
};
