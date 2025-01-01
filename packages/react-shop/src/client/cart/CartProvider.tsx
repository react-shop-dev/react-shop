import { useMemo, type PropsWithChildren, type ReactNode } from 'react';
import { isValidElementType } from 'react-is';
import type { Region } from 'react-shop-types';
import { SessionCartProvider as DefaultCartProvider } from './SessionCartProvider';
import { CartContext, CartContextProps } from './CartContext';
import { useRegion } from './useRegion';
import { useShopSession, UseShopSessionReturn } from './useShopSession';
import { defaultCart } from './defaultCart';
import { useGetIdentity } from '../auth';

export const CartProvider = ({
  cartAdapter: CartAdapter,
  children,
}: PropsWithChildren & { cartAdapter?: CartAdapterComponent }) => {
  const region = useRegion();
  const { identity } = useGetIdentity();

  const initialCart = useMemo(
    () => (!CartAdapter ? defaultCart(region, identity) : undefined),
    [CartAdapter, region],
  );

  const session = useShopSession({ cart: initialCart });

  const renderProvider = (value: CartContextProps) => (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );

  if (isValidElementType(CartAdapter)) {
    return (
      <CartAdapter region={region} session={session}>
        {renderProvider}
      </CartAdapter>
    );
  }

  return (
    <DefaultCartProvider region={region} session={session}>
      {renderProvider}
    </DefaultCartProvider>
  );
};

export type CartAdapterComponentProps = {
  session?: UseShopSessionReturn;
  region: Region;
  children: (props: CartContextProps) => ReactNode;
};

export type CartAdapterComponent = React.FC<CartAdapterComponentProps>;

export type CartProviderProps = PropsWithChildren & { ShopController: CartAdapterComponent };
