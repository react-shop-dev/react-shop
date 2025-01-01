import { useProductInterface, useRecordContext } from 'react-shop';
import get from 'lodash/get';

export const useThumbnail = (path?: string) => {
  const record = useRecordContext();

  const { thumbnail } = useProductInterface();

  return get(record, path || thumbnail);
};
