'use client';
import { forwardRef, Ref } from 'react';
import clsx from 'clsx';
import { TreeItemContentProps, useTreeItemState } from '@mui/x-tree-view/TreeItem';
import Box from '@mui/material/Box';

export const MenuItemContent = forwardRef((props: TreeItemContentProps, ref) => {
  const {
    classes,
    className,
    displayIcon,
    expansionIcon,
    icon: iconProp,
    label,
    itemId,
    onClick,
    onMouseDown,
    ...other
  } = props;

  const {
    disabled,
    expanded,
    selected,
    focused,
    handleExpansion,
    handleSelection,
    preventSelection,
  } = useTreeItemState(itemId);

  const icon = iconProp || expansionIcon || displayIcon;

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    preventSelection(event);

    if (onMouseDown) {
      onMouseDown(event);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    handleExpansion(event);
    handleSelection(event);

    if (onClick) {
      onClick(event);
    }
  };

  return (
    <Box
      className={clsx(className, classes.root, {
        [classes.expanded]: expanded,
        [classes.selected]: selected,
        [classes.focused]: focused,
        [classes.disabled]: disabled,
      })}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      ref={ref as Ref<HTMLDivElement>}
      {...other}
    >
      {icon ? <div className={classes.iconContainer}>{icon}</div> : null}
      <div className={classes.label}>{label}</div>
    </Box>
  );
});

MenuItemContent.displayName = 'MenuItemContent';
