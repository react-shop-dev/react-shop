import { useReducer, useEffect, useRef, useCallback } from 'react';
import { SortPayload } from 'src/types';

const SORT_ASC = 'ASC';
const SORT_DESC = 'DESC';

type Action =
  | { type: 'SET_SORT'; payload: SortPayload }
  | { type: 'SET_SORT_FIELD'; payload: SortPayload['field'] }
  | { type: 'SET_SORT_ORDER'; payload: SortPayload['order'] };

const sortReducer = (state: SortPayload, action: Action): SortPayload => {
  switch (action.type) {
    case 'SET_SORT':
      return action.payload;
    case 'SET_SORT_FIELD': {
      const field = action.payload;
      const order =
        state.field === field ? (state.order === SORT_ASC ? SORT_DESC : SORT_ASC) : SORT_ASC;
      return { field, order };
    }
    case 'SET_SORT_ORDER': {
      const order = action.payload;
      if (!state.field) {
        throw new Error('cannot change the order on an undefined sort field');
      }
      return { order, field: state.field };
    }
    default:
      return state;
  }
};

export const useSortState = (initialSort: SortPayload = defaultSort): SortProps => {
  const [sort, dispatch] = useReducer(sortReducer, initialSort);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    dispatch({ type: 'SET_SORT', payload: initialSort });
  }, [initialSort.field, initialSort.order]);

  return {
    sort,
    setSort: useCallback(
      (sort: SortPayload) => dispatch({ type: 'SET_SORT', payload: sort }),
      [dispatch],
    ),
    setSortField: useCallback(
      (field: string) => dispatch({ type: 'SET_SORT_FIELD', payload: field }),
      [dispatch],
    ),
    setSortOrder: useCallback(
      (order: 'ASC' | 'DESC') => dispatch({ type: 'SET_SORT_ORDER', payload: order }),
      [dispatch],
    ),
  };
};

export interface SortProps {
  sort: SortPayload;
  setSort: (sort: SortPayload) => void;
  setSortField: (field: SortPayload['field']) => void;
  setSortOrder: (field: SortPayload['order']) => void;
}

export const defaultSort = { field: '', order: 'ASC' } as const;
