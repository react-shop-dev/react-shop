import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Product } from 'react-shop-types';
import isEqual from 'lodash/isEqual';
import { useRedirect } from '../router';
import { useRecordContext } from '@core/useRecordContext';

export const useProductOptions = (
  params: UseProductOptionsParams = {},
): UseProductOptionsResult => {
  const { syncWithLocation = true, paramsKey = 'v' } = params;

  const product = useRecordContext<Product>();
  const searchParams = useSearchParams();
  const redirect = useRedirect();

  const [options, setOptions] = useState<Record<string, string>>({});

  const variants = product?.variants || [];
  const paramsVariantId = searchParams.get(paramsKey);

  const updateOptions = useCallback(
    (update: Record<string, string>) => {
      setOptions(prevOptions => ({ ...prevOptions, ...update }));
    },
    [options],
  );

  // Initialize the option state
  useEffect(() => {
    const optionObj: Record<string, string> = {};

    for (const option of product?.options || []) {
      Object.assign(optionObj, { [option.id]: undefined });
    }
    setOptions(optionObj);
  }, [product]);

  const variantRecord: Record<string, any> = useMemo(() => {
    const map: Record<string, Record<string, string>> = {};

    for (const variant of variants) {
      if (!variant.options || !variant.id) continue;

      const temp: Record<string, string> = {};

      for (const option of variant.options) {
        if (option.option_id) {
          temp[option.option_id] = option.value;
        }
      }
      map[variant.id] = temp;
    }
    return map;
  }, [variants]);

  useEffect(() => {
    if (paramsVariantId && variantRecord[paramsVariantId]) {
      updateOptions(variantRecord[paramsVariantId]);
    } else {
      updateOptions(variantRecord[variants[0].id]);
    }
  }, [variants, variantRecord, paramsVariantId]);

  const variantId = useMemo(() => {
    let variantId: string | undefined = undefined;

    for (const key of Object.keys(variantRecord)) {
      if (isEqual(variantRecord[key], options)) {
        variantId = key;
      }
    }
    return variantId;
  }, [options, variantRecord, variants]);

  useEffect(() => {
    if (!variantId) {
      return;
    }
    if (syncWithLocation) {
      redirect({
        query: { [paramsKey]: variantId },
        options: { scroll: false, keepQuery: true, keepHash: true },
      });
    }
  }, [variantId, syncWithLocation]);

  return [options, updateOptions];
};

type UseProductOptionsParams = { syncWithLocation?: boolean; paramsKey?: string };

type UseProductOptionsResult = [Record<string, string>, (value: Record<string, string>) => void];
