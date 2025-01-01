import { useContext, useMemo } from 'react';
import { ArrayInputContext, ArrayInputContextValue } from './ArrayInputContext';
import { UseFieldArrayReturn } from 'react-hook-form';

export const useArrayInput = (props?: Partial<ArrayInputContextValue>): ArrayInputContextValue => {
  const context = useContext(ArrayInputContext);

  const memo = useMemo(
    () =>
      ({
        fields: props?.fields,
        insert: props?.insert,
        remove: props?.remove,
        update: props?.update,
        replace: props?.replace,
        append: props?.append,
        prepend: props?.prepend,
        move: props?.move,
        swap: props?.swap,
      }) as UseFieldArrayReturn,
    [props],
  );

  if (props?.fields) {
    return memo;
  }

  return context!;
};
