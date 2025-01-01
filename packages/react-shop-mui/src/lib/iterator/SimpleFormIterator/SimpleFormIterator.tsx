import {
  ReactNode,
  useMemo,
  useCallback,
  cloneElement,
  ReactElement,
  MouseEvent,
  MouseEventHandler,
  useRef,
  Children,
  isValidElement,
  ComponentType,
} from 'react';
import {
  useResetField,
  ArrayInputContextValue,
  FormDataConsumer,
  useArrayInput,
  useRecordContext,
} from 'react-shop';
import type { Identifier } from 'react-shop-types';
import isFunction from 'lodash/isFunction';
import { isElement } from 'react-is';
import get from 'lodash/get';
import clsx from 'clsx';
import type { SxProps } from '@mui/material/styles';
import {
  DisableRemoveFunction,
  GetItemLabelFunc,
  SimpleFormIteratorItem,
} from '../SimpleFormIteratorItem';
import { SimpleFormIteratorContext } from '../SimpleFormIteratorContext';
import { AddItemButton as DefaultAddItemButton } from '../AddItemButton';
import { RemoveIteratorItemButton as DefaultRemoveItemButton } from '../RemoveItemButton';
import { EditItemButton as DefaultEditItemButton } from '../EditItemButton';
import { OrderChangebuttons as DefaultReOrderButtons } from '../OrderChangebuttons';
import { SubmitButton as DefaultSubmitButton } from '@button/SubmitButton';
import { FlexBox } from '@views/FlexBox';

export const SimpleFormIterator = (props: SimpleFormIteratorProps) => {
  const {
    source,
    resource,
    addButton = <DefaultAddItemButton />,
    removeButton = <DefaultRemoveItemButton />,
    editButton = <DefaultEditItemButton />,
    reOrderButtons = <DefaultReOrderButtons />,
    submitButton = <DefaultSubmitButton />,
    disabled,
    disableAdd = false,
    disableRemove = false,
    getItemLabel = false,
    disableReordering,
    setViewMode = false,
    iteratorItemWrapper,
    sx,
    children,
  } = props;
  const { fields, remove, append, move } = useArrayInput(props);

  const resetField = useResetField();

  const record = useRecordContext(props);
  const initialDefaultValue = useRef<Record<string, any>>({});

  if (fields.length > 0) {
    const { id: _id, ...rest } = fields[0];
    initialDefaultValue.current = rest;
    for (const k in initialDefaultValue.current) {
      initialDefaultValue.current[k] = null;
    }
  }

  const addField = useCallback(
    (item: any = undefined) => {
      let defaultValue = item;
      if (item == null) {
        defaultValue = initialDefaultValue.current;
        if (
          Children.count(children) === 1 &&
          isElement(children) &&
          !Children.only(children)?.props.source &&
          // Make sure it's not a FormDataConsumer
          Children.map(
            children,
            input => isValidElement(input) && input.type !== FormDataConsumer,
          )?.some(Boolean)
        ) {
          defaultValue = '';
        } else {
          defaultValue = defaultValue || {};
          Children.forEach(children, input => {
            if (isValidElement(input) && input.type !== FormDataConsumer && input.props.source) {
              defaultValue[input.props.source] = input.props.defaultValue ?? null;
            }
          });
        }
      }
      append(defaultValue);
      // Make sure the newly added inputs are not considered dirty by react-hook-form
      resetField && resetField(`${source}.${fields.length}`, { defaultValue });
    },
    [append, resetField, children, source, fields.length],
  );

  const removeField = useCallback(
    (index?: number) => {
      index && remove(index);
    },
    [remove],
  );

  const handleAddButtonClick =
    (originalOnClickHandler: MouseEventHandler) => (event: MouseEvent) => {
      addField();
      if (isFunction(originalOnClickHandler)) {
        originalOnClickHandler(event);
      }
    };

  const handleReorder = useCallback(
    (origin: number, destination: number) => {
      move(origin, destination);
    },
    [move],
  );

  const context = useMemo(
    () => ({
      total: fields.length,
      source,
      add: addField,
      remove: removeField,
      reOrder: handleReorder,
    }),
    [addField, removeField, fields.length, source, handleReorder],
  );

  const records = get(record, source as string)?.map((record: any = {}) => ({
    ...record,
    viewMode: isFunction(setViewMode) ? setViewMode(record?.id) : setViewMode,
  }));

  return fields ? (
    <SimpleFormIteratorContext.Provider value={context}>
      {fields.map((member, index) => (
        <SimpleFormIteratorItem
          key={member.id}
          index={index}
          record={get(records, index, {})}
          member={`${source}.${index}`}
          disabled={disabled}
          viewMode={get(records, index, {}).viewMode}
          source={source as string}
          resource={resource}
          removeButton={removeButton}
          editButton={editButton}
          disableRemove={disableRemove}
          onRemoveField={removeField}
          reOrderButtons={reOrderButtons}
          disableReordering={disableReordering}
          getItemLabel={getItemLabel}
          iteratorItemWrapper={iteratorItemWrapper}
          sx={sx}
        >
          {children}
        </SimpleFormIteratorItem>
      ))}
      <FlexBox justifyContent="space-between">
        {!disableAdd
          ? cloneElement(addButton, {
              className: clsx('button-add', `button-add-${source}`),
              onClick: handleAddButtonClick(addButton.props.onClick),
            })
          : null}
        {setViewMode ? submitButton : null}
      </FlexBox>
    </SimpleFormIteratorContext.Provider>
  ) : null;
};

type SetViewModeFunc = (id: Identifier) => boolean;

export interface SimpleFormIteratorProps {
  children: ReactNode;
  addButton?: ReactElement;
  removeButton?: ReactElement;
  editButton?: ReactElement;
  submitButton?: ReactElement;
  disableAdd?: boolean;
  disableRemove?: boolean | DisableRemoveFunction;
  disableReordering?: boolean;
  reOrderButtons?: ReactElement;
  readOnly?: boolean;
  disabled?: boolean;
  source?: string;
  resource?: string;
  setViewMode?: boolean | SetViewModeFunc;
  fields?: ArrayInputContextValue['fields'];
  getItemLabel?: boolean | GetItemLabelFunc;
  iteratorItemWrapper?: ComponentType<{ children: ReactNode }>;
  sx?: SxProps;
}
