import { Children, cloneElement } from 'react';
import { isElement } from 'react-is';
import { useParams } from 'next/navigation';
import Tabs, { type TabsProps } from '@mui/material/Tabs';
import { getTabFullPath } from './ShopTabsView';

export interface TabsHeaderProps extends TabsProps {
  syncWithLocation?: boolean;
}

export const ShopTabsHeader = ({ value, syncWithLocation, children, ...rest }: TabsHeaderProps) => {
  const { tabs } = useParams();
  const tabParam = Array.isArray(tabs) ? tabs.join('/') : tabs;

  const tabValue = syncWithLocation ? (tabParam ? tabParam : '') : value;

  return (
    <Tabs
      id="tabs"
      value={tabValue}
      textColor="primary"
      indicatorColor="primary"
      component="div"
      {...rest}
    >
      {Children.map(children, (tab, index) => {
        if (!isElement(tab)) {
          return null;
        }
        const tabPath = getTabFullPath(tab, index);
        return cloneElement(tab, {
          intent: 'header',
          value: syncWithLocation ? tabPath : index,
          syncWithLocation,
        });
      })}
    </Tabs>
  );
};
