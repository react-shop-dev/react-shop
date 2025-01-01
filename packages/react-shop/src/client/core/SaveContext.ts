import { createContext, useMemo } from 'react';
import pick from 'lodash/pick';
import type { RsRecord } from 'react-shop-types';
import type { MutationMode, OnError, OnSuccess, TransformData } from '@type/data';

export interface SaveContextValue<RecordType extends RsRecord = any> {
  save?: SaveHandler<RecordType>;
  mutationMode?: MutationMode;
  saving?: boolean;
}

export type SaveHandler<RecordType> = (
  record: Partial<RecordType>,
  callbacks?: {
    onSuccess?: OnSuccess;
    onError?: OnError;
    transform?: TransformData;
  },
) => Promise<void | RecordType> | Record<string, string>;

export const SaveContext = createContext<SaveContextValue | undefined>(undefined);

SaveContext.displayName = 'SaveContext';

export const usePickSaveContext = <ContextType extends SaveContextValue = SaveContextValue>(
  context: ContextType,
): SaveContextValue => {
  const value = useMemo(
    () => pick(context, ['save', 'saving', ' mutationMode']),

    [context.save, context.saving, context.mutationMode],
  );
  return value;
};
