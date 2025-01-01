import { Fragment, ReactNode, ReactElement, cloneElement, isValidElement } from 'react';
import isFunction from 'lodash/isFunction';
import { useListContext } from '@data/list/useListContext';

export type ListViewParams = {
  data: any;
  isPending: boolean;
  total?: number;
  error?: unknown;
};

type ListViewRenderFunction = (params: ListViewParams) => ReactNode;

export interface ListViewProps {
  children: ListViewRenderFunction | ReactElement<ListViewParams>;
  pagination?: ReactElement | false;
  empty?: ReactElement | false;
}

export const ListView = (props: ListViewProps) => {
  const { empty, pagination, children } = props;

  const { isPending, data, total, filterValues, error } = useListContext();

  const shouldRenderEmptyPage =
    empty !== false && !isPending && data?.length === 0 && !Object.keys(filterValues).length;

  const renderChildren = () =>
    isFunction(children)
      ? children({ isPending, data, total, error })
      : isValidElement(children)
        ? cloneElement(children, { isPending, data, total, error })
        : null;

  return (
    <Fragment>
      {shouldRenderEmptyPage ? empty : renderChildren()}
      {pagination !== false ? pagination : null}
    </Fragment>
  );
};
