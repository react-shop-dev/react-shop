'use client';

import type { Identifier } from 'react-shop-types';
import uniqueId from 'lodash/uniqueId';
import { treeItemClasses } from '@mui/x-tree-view/TreeItem';
import { type SimpleTreeViewProps } from '@mui/x-tree-view/SimpleTreeView';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { StyledTreeItem } from './StyledTreeItem';
import type { NextMuiLinkProps } from '@common/NextMuiLink';
import { StyledTreeView } from './SideMenu.styles';

export interface RenderTree {
  id?: Identifier;
  title?: string;
  icon?: React.ElementType<SvgIconProps> | false;
  children?: readonly RenderTree[];
  [key: string]: any;
}

export type SideMenuProps = SimpleTreeViewProps<any> & {
  itemText?: string;
  redirectTo?: (node: any) => NextMuiLinkProps['href'];
  data: RenderTree[];
};

export const SideMenu = (props: SideMenuProps) => {
  const { data, itemText = 'name', redirectTo, slots, ...rest } = props;

  const renderTree = (nodes: RenderTree[]) =>
    nodes.map((node, index) => (
      <StyledTreeItem
        key={node.id || uniqueId()}
        itemId={String(node.id || index)}
        title={node[itemText]}
        classes={treeItemClasses}
        labelIcon={node.icon}
        exact={node.exact}
        href={typeof redirectTo === 'function' ? redirectTo(node) : node.href}
        expandable={!!node?.children?.length}
      >
        {Array.isArray(node.children) ? renderTree(node.children) : null}
      </StyledTreeItem>
    ));

  return (
    <StyledTreeView
      aria-label="Sidebar navigation"
      slots={{ collapseIcon: ExpandMoreIcon, expandIcon: ChevronRightIcon, ...slots }}
      {...rest}
    >
      {renderTree(data)}
    </StyledTreeView>
  );
};
