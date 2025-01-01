import type { Identifier, RsRecord } from 'react-shop-types';
import { useGetManyAggregate } from '../list/useGetManyAggregate';
import type { UseGetManyAggregateOptions, UseGetManyHookValue } from '../list';

export const useReference = <RecordType extends RsRecord = RsRecord>({
  reference,
  id,
  options = {},
}: UseReferenceProps<RecordType>): UseReferenceResult<RecordType> => {
  const { meta, ...otherQueryOptions } = options;

  const { data, error, isLoading, isFetching, isPending, refetch } =
    useGetManyAggregate<RecordType>(
      reference,
      {
        ids: [id],
        meta,
      },
      otherQueryOptions,
    );

  return {
    referenceRecord: error ? undefined : data ? data[0] : undefined,
    error,
    isLoading,
    isFetching,
    isPending,
    refetch,
  };
};

export interface UseReferenceResult<RecordType extends RsRecord = any> {
  isLoading: boolean;
  isFetching: boolean;
  isPending: boolean;
  referenceRecord?: RecordType;
  error?: any;
  refetch: UseGetManyHookValue<RecordType>['refetch'];
}

interface UseReferenceProps<RecordType extends RsRecord = any> {
  id: Identifier;
  reference: string;
  options?: UseGetManyAggregateOptions<RecordType>;
}
