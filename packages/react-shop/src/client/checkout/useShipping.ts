import type { Identifier, ShippingOption } from 'react-shop-types';
import { useSuspenseGetList, type UseSuspenseGetListOptions } from '@data/list';
import { useCartProvider } from '../cart';
import { useRedirect } from '../router';

export type UseShippingOptions = {
  shippingEndpoint?: string;
  shippingListOptions?: UseSuspenseGetListOptions;
};

export const useShipping = ({
  shippingEndpoint = 'shipping',
  shippingListOptions,
}: UseShippingOptions = {}): UseShippingReturn => {
  const { cart, updateCart } = useCartProvider();
  const redirect = useRedirect();

  const { data, error } = useSuspenseGetList<ShippingOption>(
    shippingEndpoint,
    {
      filter: { region_id: cart.region_id },
    },
    { refetchOnWindowFocus: false, ...shippingListOptions },
  );

  const setShipping = async (shippingOptionId: Identifier, searchParams = false) => {
    const shippingOption = data?.find(option => option.id === shippingOptionId);

    try {
      updateCart({
        cartId: cart?.id,
        data: {
          shipping_total: shippingOption?.price_incl_tax,
          shipping_methods: shippingOption
            ? [createShippingMethod(cart.id, shippingOption)]
            : undefined,
        },
      });
    } catch (error: any) {
      console.error('CheckoutProvider: set shipping method error', error);
    }
    if (searchParams) {
      redirect({
        query: { shipping: shippingOptionId },
        options: { scroll: false, keepQuery: true },
      });
    }
  };

  return { data, setShipping, error };
};

export type ShippingOptionData = ShippingOption[] | undefined;
export type SetShippingMethod = (shippingOptionId: Identifier, searchParams?: boolean) => void;

type UseShippingReturn = {
  data: ShippingOptionData;
  setShipping: SetShippingMethod;
  isPending?: boolean;
  error?: unknown;
};

const createShippingMethod = (cartId: Identifier, shippingOption: ShippingOption) => ({
  id: '_shop_shipping_id',
  cart_id: cartId,
  shipping_option_id: shippingOption.id,
  shipping_option: shippingOption,
  price: shippingOption.price_incl_tax as number,
});
