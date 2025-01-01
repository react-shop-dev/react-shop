import { useState, Children, cloneElement, SyntheticEvent, ReactNode, ReactElement } from 'react';
import { isElement } from 'react-is';
import { useParams } from 'next/navigation';
import { clsx } from 'clsx';
import Box from '@mui/material/Box';
import type { SxProps } from '@mui/material/styles';
import { ShopTabsHeader } from './ShopTabsHeader';

export interface TabsViewProps {
  tabs?: ReactElement;
  children?: ReactNode;
  sx?: SxProps;
  syncWithLocation?: boolean;
  className?: string;
}

const DefaultTabs = <ShopTabsHeader />;

export const ShopTabsView = ({
  tabs = DefaultTabs,
  syncWithLocation,
  className,
  children,
  ...rest
}: TabsViewProps) => {
  const { tabs: tabsParams } = useParams();
  const tabParam = Array.isArray(tabsParams) ? tabsParams.join('/') : tabsParams;

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_event: SyntheticEvent, value: number) => {
    if (!syncWithLocation) {
      setTabValue(value);
    }
  };

  const renderTabHeaders = () =>
    cloneElement(
      tabs,
      {
        value: tabValue,
        onChange: handleTabChange,
        syncWithLocation,
      },
      children,
    );

  return (
    <div className={clsx('shop-tabs', className)} {...rest}>
      {renderTabHeaders()}
      <Box sx={{ my: 4 }}>
        {Children.map(children, (tab, index) => {
          if (!tab) {
            return null;
          }
          const tabPath = getTabFullPath(tab as ReactElement, index);
          const hidden = syncWithLocation
            ? tabParam
              ? tabPath !== tabParam
              : index !== 0
            : tabValue !== index;

          return isElement(tab)
            ? cloneElement(tab, {
                value: syncWithLocation ? tabPath : index,
                hidden,
                intent: 'content',
              })
            : null;
        })}
      </Box>
    </div>
  );
};

export const getTabFullPath = (tab: ReactElement, index: number): string =>
  tab.props.path != null ? tab.props.path : index > 0 ? index.toString() : '';
