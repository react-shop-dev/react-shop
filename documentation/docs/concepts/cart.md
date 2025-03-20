# Cart

**React shop** library provides a flexible and extendable cart functionality through the *cartAdapter* component. Under the hood *cartAdapter* property is used by ``CartProvider`` component, which leverages a [Render props](https://react.dev/reference/react/cloneElement#passing-data-with-a-render-prop) pattern combining with React context to manage cart data and actions.

Internally CartProvider uses a ``SessionCartProvider`` as a default cart adapter component. This component handle cart functionality by calling ``session`` api endpoint, and rely on ``dataProvider`` settings.

However, as a developer, you are encouraged to create own cart adapter component tailored to your specific use case (for example integration with E-commerce platforms like [Shopify](https://www.shopify.com/) or [Medusa.js](https://medusajs.com/)).

## Usage

The ShopClient accepts a cartAdapter prop. CartAdapter is a React functional component which return children render prop that follows ``CartContextProps`` type definition described below.

```jsx title="Example"
import type { FC, PropsWithChildren, ReactNode } from 'react';
import { ShopClient, type CartContextProps } from 'react-shop';

const MyCartAdapter: FC<{ children: (props: CartContextProps) => ReactNode }> = () => {
  return props.children({
    ...
  })
}

const StoreFront: FC<PropsWithChildren> = ({ children }) => (
  <ShopClient cartAdapter={MyCartAdapter}>
    {children}
  </ShopClient>
);
```
## Cart Interface Overview

The ``CartContextProps`` interface provides the following properties:

#### ``cart``
 Represents the current cart object, containing cart details such as ID, total amount, shipping options, currencies, active payment sessions etc.
``data``
An array of cart line items or null if the cart is empty.
#### ``itemsTotal``
Total number of items in the cart. Mostly used to show total summary on cart and checkout pages. 
#### ``updateCart``
Updates the entire cart with the provided payload. This method is used when you select shipping method or payment provider for example.
#### ``addItem``
Adds a new item to the cart with the provided payload. Can be used with adding-to-cart button component. Requires product `variantId` and `item` itself.
#### ``updateItem``
Updates a specific item in the cart. Used by QuantityInput where user can control count of specific line item. Requires `lineId`. `Quantity` is optional and by default equals **1**.
#### ``removeItem``
Removes an item from the cart. Requires `lineId`.
#### ``completeCart``
Completes the cart checkout process. Optionally accepts a ``cartId``. This method is invoked when order was successfully placed.
#### ``error``
Captures any error that may occur during cart operations.
#### ``isFetching``
Indicates whether cart data is currently being fetched.

### API Reference

| Option | Type | Payload
| --- | --- | --- |
| **cart**  | ``Cart`` | |
| **data**  | ``LineItem[]`` or ``null``  | |
| **itemsTotal**  | ``number``  | |
| **updateCart**  | ``(payload: UpdateCartPayload) => void`` | ```UpdateCartPayload = { cartId?: Cart['id']; data: any; options?: UseUpdateOptions; }``` |
| **addItem**  | ``(payload: AddToCartPayload) => void``  | ```AddToCartPayload = { variantId: Identifier; cartId?: Cart['id'];  quantity?: number; item?: Product; }``` |
| **updateItem**  | ``(payload: UpdateItemPayload) => void``  | ```UpdateItemPayload = { lineId: Identifier; cartId?: Cart['id']; quantity?: number; }``` |
| **removeItem**  | ``(payload: RemoveFromCartPayload) => void`` | ```RemoveFromCartPayload = { lineId: Identifier; cartId?: Cart['id']; }``` |
| **completeCart**  | ``(cartId?: Cart['id']) => void`` |  |
| **error**  | ``unknown`` or ``undefined`` | |
| **isFetching**  | ``boolean`` or ``undefined`` | | 

## Calling The CartProvider

### useCartProvider 

This hook provides access to the ``CartContextProps`` values. This hook should be used within a CartContext to ensure proper functionality.
Hook simplifies access to cart-related data and actions, ensuring that developers can easily manage cart logic across their application.

### Examples

```jsx title="CartList.tsx"
'use client';
import { useCartProvider } from 'react-shop';

const CartList = () => {
  const { data, isFetching, itemsTotal } = useCartProvider();
  if(isFetching) {
    return "Loading...";
  }
  if(itemsTotal === 0) {
    return "Cart is empty";
  }
  return (
    <ul>
      {data.map(item => (
        <li key={item.id}>
          <img src={item.thumbnail} alt={item.title} />
          <div>{item.title}</div>
          <div>Quantity: {item.quantity}</div>
        </li>
      ))}
    </ul>
  )
}
```

```jsx title="AddToCartButton.tsx"
'use client';
import { useCartProvider } from 'react-shop';
import type { Product } from 'react-shop-types';

const AddToCartButton = () => {
  const { addItem, isFetching } = useCartProvider();
  return (
    <button 
      disabled={isFetching} 
      onClick={() => addItem({ variantId: <variantID>, item: <record> })}>
        Add To Cart
      </button>
  );
}
```

:::note
``useCartProvider`` hook is used internally in [``CheckoutProvider``](http://react-shop.dev/docs/concepts/checkout) and in payment adapters like ``react-shop-stripe``.
:::

## Writing a CartAdapter component

Inside component you should get cart object containing line items, compute cart total summ and implement cart methods: ``updateCart``, ``addItem``, ``updateItem`` and ``removeItem``. Optionally you can return ``error`` and ``isFetching`` props. CartAdapter automatically receives ``region`` as a prop, so you can get info about currencies, payment providers, tax rates etc.

```jsx
import { type CartAdapterComponentProps } from 'react-shop';

const MyCartAdapter = async (props: CartAdapterComponentProps) => {
  const { region, children } = props;
  const cart = await fetch('/cart-api');
  const updateCart = (payload: UpdateCartPayload) => { ... };
  const addItem = (payload: AddToCartPayload) => { ... };
  const updateItem = (payload: UpdateItemPayload) => { ... };
  const removeItem = (payload: RemoveFromCartPayload) => { ... };
  const itemsTotal = ...; // Compute cart total summ
    
  return children({
    cart,
    data: cart.items,
    itemsTotal,
    updateCart,
    addItem,
    updateItem,
    removeItem,
    completeCart,
  })
};
```
