import { useMemo, useState } from 'react';
import type { RsRecord } from 'react-shop-types';

export const useRecordSelection = <RecordType extends RsRecord = any>(): [
  RecordType['id'][],
  {
    select: (ids: RecordType['id'][]) => void;
    unselect: (ids: RecordType['id'][]) => void;
    toggle: (ids: RecordType['id']) => void;
    clearSelection: () => void;
  },
] => {
  const [ids, setIds] = useState<RecordType['id'][]>([]);

  const selectionModifiers = useMemo(
    () => ({
      select: (idsToAdd: RecordType['id'][]) => {
        if (!idsToAdd) return;
        setIds([...idsToAdd]);
      },
      unselect: (idsToRemove: RecordType['id'][]) => {
        if (!idsToRemove || idsToRemove.length === 0) return;
        setIds((ids: unknown) => {
          if (!Array.isArray(ids)) return [];
          return ids.filter(id => !idsToRemove.includes(id));
        });
      },
      toggle: (id: RecordType['id']) => {
        if (typeof id === 'undefined') return;
        setIds((ids: any) => {
          if (!Array.isArray(ids)) return [...ids];
          const index = ids.indexOf(id);
          return index > -1 ? [...ids.slice(0, index), ...ids.slice(index + 1)] : [...ids, id];
        });
      },
      clearSelection: () => {
        setIds([]);
      },
    }),
    [setIds],
  );

  return [ids, selectionModifiers];
};
