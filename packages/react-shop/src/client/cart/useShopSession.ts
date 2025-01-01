import { useCallback, useState, useEffect } from 'react';
import type { Identifier } from 'react-shop-types';
import { useNotify } from '../notification/useNotify';
import { useGetOne } from '@data/show/useGetOne';
import { useDelete } from '@data/mutate/useDelete';
import { CreateMutationFunction, useCreate } from '@data/mutate/useCreate';
import { useUpdate, UseUpdateOptions } from '@data/mutate/useUpdate';
import { destroyCookie, setCookies } from '@lib/cookies';
import { SESSION_KEY } from '../../constants';
import { getShopConfig } from '@functions/shopConfig';
import type { ShopSession } from '@type/lib';
import type { DefaultCart } from './defaultCart';

export const useShopSession = (params: UseShopSessionParams = {}): UseShopSessionReturn => {
  const { cart } = params;

  const globalConfig = getShopConfig();
  const resource = globalConfig.session?.api || 'session';
  const prefetchedSession = globalConfig?.session?.sessionResult;
  const cookieSessionId = globalConfig?.session?.sessionID;

  const [sessionId, setSessionId] = useState<Identifier | undefined>(cookieSessionId);
  const notify = useNotify();

  const {
    data: sessionData,
    error,
    isPending: isPendingSession,
    refetch,
  } = useGetOne(
    resource,
    { id: sessionId as Identifier },
    {
      ...(prefetchedSession ? { initialData: prefetchedSession } : {}),
      enabled: !!sessionId,
      refetchOnWindowFocus: false,
      onError: (error: unknown) => {
        removeSession();
        handleError(error, 'Error fetching session');
      },
    },
  );

  const [createSession] = useCreate(
    resource,
    {
      data: {
        ...(cart ? { cart } : {}),
      },
    },
    {
      onSuccess: data => {
        setCookies({
          name: SESSION_KEY,
          value: data?.id,
          options: { expires: new Date(Date.now() + WEEK_IN_MILISECONDS) },
        });
        setSessionId(data?.id as string);
      },
      onError: (error: unknown) => {
        handleError(error, 'Error creating session');
      },
    },
  );

  const [update, { isPending }] = useUpdate(resource);

  const updateSession = useCallback(
    async (data: Partial<ShopSession>, options: UseUpdateOptions = {}) => {
      try {
        await update(
          resource,
          {
            id: sessionId,
            data,
          },
          {
            onSuccess: () => {
              refetch();
            },
            onError: (error: unknown) => {
              handleError(error, 'Error updating session');
            },
            ...options,
          },
        );
      } catch (error: unknown) {
        /* empty */
      }
    },

    [sessionId],
  );

  const [removeSession] = useDelete(
    resource,
    { id: sessionId },
    {
      onSuccess: () => {
        destroyCookie(SESSION_KEY);
        setSessionId(undefined);
      },
    },
  );

  const handleError = (error: unknown, defaultMessage: string) => {
    const message = error instanceof Error ? error.message : defaultMessage;
    console.error('useShopSession:', message);
    notify(message, { type: 'error' });
  };

  useEffect(() => {
    const ensureSession = async () => {
      if (!sessionId) {
        await createSession();
        return;
      }
    };
    ensureSession();
  }, []);

  return {
    id: sessionData?.id,
    data: sessionData,
    error,
    updateSession,
    createSession,
    removeSession,
    isFetching: isPendingSession || isPending,
  };
};

const WEEK_IN_MILISECONDS = 1000 * 60 * 60 * 24 * 7;

/**
 *  @example
 *  const sessionData = {
 *   id: string;
 *   comparion: {},
 *   cart: {
 *     id: string;
 *     region_id: string;
 *     region: <region>;
 *     payment_session: <payment session>;
 *     payment_sessions: Array<payment session>;
 *     shipping_methods: [];
 *     total: number,
 *     subtotal: number,
 *     tax_total: number;
 *     shipping_total: number,
 *     shipping_tax_total: number,
 *     item_tax_total: number,
 *     discount_total: number,
 *     idempontency_key: string;
 *     ...rest
 *     items: {
 *       [line_item_id] : {
 *         id: string;
 *         product_id?: id;
 *         title: string;
 *         quantity: number;
 *         ...rest
 *       }
 *     }
 *   }
 *  }
 */

export interface UseShopSessionParams {
  cart?: DefaultCart;
}

export interface UseShopSessionReturn {
  id: string;
  data?: ShopSession;
  error?: unknown;
  isFetching: boolean;
  updateSession: (data: Partial<ShopSession>, options?: UseUpdateOptions) => Promise<void>;
  createSession: CreateMutationFunction<
    { cart?: DefaultCart },
    boolean,
    unknown,
    { cart?: DefaultCart } & {
      id: Identifier;
    }
  >;
  removeSession: () => void;
}
