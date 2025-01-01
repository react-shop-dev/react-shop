'use client';
import { ReactElement, memo } from 'react';
import { useEvent, useListFilterContext } from 'react-shop';
import { shallowEqual } from 'react-shop/functions';
import matches from 'lodash/matches';
import pickBy from 'lodash/pickBy';
import ListItem, { type ListItemProps } from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import CancelIcon from '@mui/icons-material/CancelOutlined';
import styled from '@mui/material/styles/styled';
import { IconTooltipButton } from '@button/IconTooltipButton';

export interface FilterListItemProps extends Omit<ListItemProps, 'value'> {
  value: any;
  label: string | ReactElement;
  toggleFilter?: (value: any, filters: any) => any;
  isSelected?: (value: any, filters: any) => boolean;
}

const arePropsEqual = (prevProps: FilterListItemProps, nextProps: FilterListItemProps) =>
  prevProps.label === nextProps.label && shallowEqual(prevProps.value, nextProps.value);

export const FilterListItem = memo((props: FilterListItemProps) => {
  const {
    value,
    label,
    isSelected: getIsSelected = DefaultIsSelected,
    toggleFilter: useToggleFilter = DefaultToggleFilter,
    ...rest
  } = props;

  const { filterValues, setFilters } = useListFilterContext();

  const toggleFilter = useEvent(useToggleFilter);

  const handleClick = () => setFilters(toggleFilter(value, filterValues), false);

  const isSelected = getIsSelected(value, filterValues);

  return (
    <StyledListItem
      onClick={handleClick}
      disablePadding
      {...rest}
      secondaryAction={
        isSelected ? (
          <IconTooltipButton
            onClick={event => {
              event.stopPropagation();
              handleClick();
            }}
            label="rs.action.cancel"
            size="small"
          >
            <CancelIcon />
          </IconTooltipButton>
        ) : null
      }
    >
      <ListItemButton
        disableGutters
        selected={isSelected}
        className={FilterListItemClasses.listItemButton}
      >
        <ListItemText
          primary={label}
          className={FilterListItemClasses.listItemText}
          data-selected={isSelected ? 'true' : 'false'}
        />
      </ListItemButton>
    </StyledListItem>
  );
}, arePropsEqual);

const DefaultIsSelected = (value: any, filters: any) =>
  matches(pickBy(value, val => typeof val !== 'undefined'))(filters);

const DefaultToggleFilter = (value: any, filters: any) => {
  const isSelected = matches(pickBy(value, val => typeof val !== 'undefined'))(filters);

  if (isSelected) {
    const keysToRemove = Object.keys(value);
    return Object.keys(filters).reduce(
      (acc, key) => (keysToRemove.includes(key) ? acc : { ...acc, [key]: filters[key] }),
      {},
    );
  }

  return { ...filters, ...value };
};

FilterListItem.displayName = 'FilterListItem';

const PREFIX = 'ShopFilterListItem';

const FilterListItemClasses = {
  listItemButton: `${PREFIX}-listItemButton`,
  listItemText: `${PREFIX}-listItemText`,
};

const StyledListItem = styled(ListItem, {
  name: PREFIX,
  overridesResolver: (_, styles) => styles.root,
})({
  [`& .${FilterListItemClasses.listItemButton}`]: {
    paddingRight: '2em',
    paddingLeft: '2em',
  },
  [`& .${FilterListItemClasses.listItemText}`]: {
    margin: 0,
  },
});
