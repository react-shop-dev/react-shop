import { Reducer } from 'react';
import { ListParams } from './useListParams';

export const SET_SORT = 'SET_SORT';
export const SORT_ASC = 'ASC';
export const SORT_DESC = 'DESC';

export const SET_PAGE = 'SET_PAGE';
export const SET_PER_PAGE = 'SET_PER_PAGE';
export const SET_FILTER = 'SET_FILTER';

const oppositeOrder = (direction: string) => (direction === SORT_DESC ? SORT_ASC : SORT_DESC);

type ActionTypes =
  | {
      type: typeof SET_SORT;
      payload: {
        field: string;
        order?: typeof SORT_ASC | typeof SORT_DESC;
      };
    }
  | {
      type: typeof SET_PAGE;
      payload: number;
    }
  | {
      type: typeof SET_PER_PAGE;
      payload: number;
    }
  | {
      type: typeof SET_FILTER;
      payload: {
        filter: any;
      };
    };

/**
 * This reducer is for the react-router query string.
 */
export const queryReducer: Reducer<ListParams, ActionTypes> = (previousState, action) => {
  switch (action.type) {
    case SET_SORT:
      if (action.payload.field === previousState.sort) {
        return {
          ...previousState,
          order: oppositeOrder(previousState.order),
          page: 1,
        };
      }

      return {
        ...previousState,
        sort: action.payload.field,
        order: action.payload.order || SORT_ASC,
        page: 1,
      };

    case SET_PAGE:
      return { ...previousState, page: action.payload };

    case SET_PER_PAGE:
      return { ...previousState, page: 1, perPage: action.payload };

    case SET_FILTER: {
      return {
        ...previousState,
        page: 1,
        filter: action.payload.filter,
      };
    }

    default:
      return previousState;
  }
};
