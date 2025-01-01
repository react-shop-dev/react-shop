import queryString from 'query-string';
import { ListParams } from './list/useListParams';
import { shallowEqual } from '@functions/shallowEqual';

const isObject = (obj: any) => obj && Object.prototype.toString.call(obj) === '[object Object]';

const isEmpty = (obj: any) =>
  obj instanceof Date
    ? false
    : obj === '' || obj === null || obj === undefined || shallowEqual(obj, {});

export const removeEmpty = (object: any) =>
  Object.keys(object).reduce((acc, key) => {
    let child = object[key];

    if (isObject(object[key])) {
      child = removeEmpty(object[key]);
    }

    return isEmpty(child) ? acc : { ...acc, [key]: child };
  }, {});

export const parseQueryFromLocation = ({ search }: { search?: string }): Partial<ListParams> => {
  const query = queryString.parse(search ?? '');
  parseObject(query, 'filter');
  return query;
};

const parseObject = (query: any, field: string) => {
  if (query[field] && typeof query[field] === 'string') {
    try {
      query[field] = JSON.parse(query[field]);
    } catch (err) {
      delete query[field];
    }
  }
};

export const getQuery = ({
  queryFromLocation,
  params,
  filterDefaultValues,
  sort,
  perPage,
}: any) => {
  const query: Partial<ListParams> =
    Object.keys(queryFromLocation).length > 0
      ? queryFromLocation
      : hasCustomParams(params)
        ? { ...params }
        : { filter: filterDefaultValues || {} };

  if (!query.sort) {
    query.sort = sort.field;
    query.order = sort.order;
  }
  if (query.perPage == null) {
    query.perPage = perPage;
  }
  if (query.page == null) {
    query.page = 1;
  }

  return {
    ...query,
    page: getNumberOrDefault(query.page, 1),
    perPage: getNumberOrDefault(query.perPage, 12),
  } as ListParams;
};

export const getNumberOrDefault = (
  possibleNumber: string | number | undefined,
  defaultValue: number,
) => {
  const parsedNumber =
    typeof possibleNumber === 'string' ? parseInt(possibleNumber, 10) : possibleNumber;

  return isNaN(parsedNumber || 0) ? defaultValue : parsedNumber;
};

const hasCustomParams = (params: ListParams) => {
  return (
    params &&
    params.filter &&
    (Object.keys(params.filter).length > 0 ||
      params.order != null ||
      params.page !== 1 ||
      params.perPage != null ||
      params.sort != null)
  );
};
