import type { ReactElement, ReactNode } from 'react';
import type { RsRecord } from 'react-shop-types';
import { ShopTabsView, type TabsViewProps } from '../ShopTab/ShopTabsView';
import { ShopTab } from '../ShopTab';

export interface ShopTabsProps extends Partial<TabsViewProps> {
  children: ReactNode;
  className?: string;
  tabs?: ReactElement;
  record?: RsRecord;
  syncWithLocation?: boolean;
}

export const ShopTabs = (props: ShopTabsProps) => {
  return <ShopTabsView {...props} />;
};

ShopTabs.Tab = ShopTab;
