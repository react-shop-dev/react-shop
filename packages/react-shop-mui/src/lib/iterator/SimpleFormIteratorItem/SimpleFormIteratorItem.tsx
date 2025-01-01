import {
  useState,
  useMemo,
  ReactElement,
  ReactNode,
  Children,
  cloneElement,
  MouseEventHandler,
  MouseEvent,
  ComponentType,
} from 'react';
import type { ArrayInputContextValue } from 'react-shop';
import type { RsRecord } from 'react-shop-types';
import { clsx } from 'clsx';
import { isElement } from 'react-is';
import isFunction from 'lodash/isFunction';
import Typography from '@mui/material/Typography';
import type { SxProps } from '@mui/material/styles';
import { FlexBox } from '@views/FlexBox';
import Box from '@mui/material/Box';
import { SimpleFormIteratorItemContext } from '../SimpleFormIteratorItemContext';
import { useSimpleFormIterator } from '../useSimpleFormIterator';

export const SimpleFormIteratorItem = (props: SimpleFormIteratorItemProps) => {
  const {
    index,
    getItemLabel,
    disabled,
    disableRemove,
    record,
    member,
    source,
    resource,
    removeButton,
    editButton,
    disableReordering,
    reOrderButtons,
    viewMode: viewModeProp = false,
    iteratorItemWrapper: ItemWrapper = Noop,
    sx,
    children,
  } = props;

  const { total, remove, reOrder } = useSimpleFormIterator();

  const [viewMode, setViewMode] = useState(viewModeProp);

  const context = useMemo(
    () => ({
      index,
      total,
      remove: () => remove(index),
      reOrder: (newIndex: number) => reOrder(index, newIndex),
    }),
    [index, total, remove, reOrder],
  );

  const label = isFunction(getItemLabel) ? getItemLabel(index) : getItemLabel;

  const disableRemoveField = (record: RsRecord) => {
    if (typeof disableRemove === 'boolean') {
      return disableRemove;
    }
    return disableRemove && disableRemove(record);
  };

  const handleRemoveButtonClick =
    (originalOnClickHandler: MouseEventHandler, index: number) => (event: MouseEvent) => {
      remove(index);
      if (isFunction(originalOnClickHandler)) {
        originalOnClickHandler(event);
      }
    };

  const handleEditButtonClick =
    (originalOnClickHandler: MouseEventHandler) => (event: MouseEvent) => {
      setViewMode(!viewMode);
      if (isFunction(originalOnClickHandler)) {
        originalOnClickHandler(event);
      }
    };

  return (
    <SimpleFormIteratorItemContext.Provider value={context}>
      <ItemWrapper>
        {label ? <Typography variant="body2">{label}</Typography> : null}
        <FlexBox justifyContent="space-between" alignItems="center" sx={sx}>
          <Box display="grid" gridTemplateColumns="1fr" flexGrow={1}>
            <FlexBox
              justifyContent="space-evenly"
              gap={5}
              sx={{
                overflowY: 'hidden',
                overflowX: 'auto',
                py: 1,
              }}
            >
              {Children.map(children, (input: unknown, elemIndex) => {
                if (!isElement(input)) {
                  return null;
                }
                const { source, ...inputProps } = input.props;
                return cloneElement(input, {
                  source: source ? `${member}.${source}` : member,
                  disabled,
                  resource,
                  viewMode,
                  index: source ? undefined : elemIndex,
                  ...inputProps,
                });
              })}
            </FlexBox>
          </Box>
          {!disabled ? (
            <FlexBox gap={1} flexShrink={0} sx={{ ml: 2 }}>
              {!disableReordering && reOrderButtons
                ? cloneElement(reOrderButtons, {
                    index,
                    max: total,
                    reOrder,
                    className: clsx('button-reorder', `button-reorder-${source}-${index}`),
                  })
                : null}
              {viewModeProp && editButton
                ? cloneElement(editButton, {
                    onClick: handleEditButtonClick(editButton?.props.onClick),
                    viewMode,
                    className: clsx('button-edit', `button-edit-${source}-${index}`),
                  })
                : null}
              {!disableRemoveField(record)
                ? cloneElement(removeButton as ReactElement, {
                    onClick: handleRemoveButtonClick(removeButton?.props.onClick, index),
                    className: clsx('button-remove', `button-remove-${source}-${index}`),
                  })
                : null}
            </FlexBox>
          ) : null}
        </FlexBox>
      </ItemWrapper>
    </SimpleFormIteratorItemContext.Provider>
  );
};

const Noop = ({ children }: { children: ReactNode }) => <>{children}</>;

export type DisableRemoveFunction = (record: RsRecord) => boolean;

export type GetItemLabelFunc = (index: number) => string | ReactElement;

export interface SimpleFormIteratorItemProps extends Partial<ArrayInputContextValue> {
  index: number;
  children?: ReactNode;
  member: string;
  record: RsRecord;
  source: string;
  resource?: string;
  disabled?: boolean;
  disableRemove?: boolean | DisableRemoveFunction;
  removeButton?: ReactElement;
  editButton?: ReactElement;
  reOrderButtons?: ReactElement;
  disableReordering?: boolean;
  viewMode?: boolean;
  iteratorItemWrapper?: ComponentType<{ children: ReactNode }>;
  onRemoveField: (index: number) => void;
  getItemLabel?: boolean | GetItemLabelFunc;
  sx?: SxProps;
}
