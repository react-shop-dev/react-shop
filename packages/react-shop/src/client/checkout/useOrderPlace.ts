import {
  OrderStatus,
  type Order,
  type OnPlaceOrderPayload,
  Payment,
  FulfillmentStatus,
  PaymentStatus,
} from 'react-shop-types';
import uniqueId from 'lodash/uniqueId';
import isFunction from 'lodash/isFunction';
import { useCreate } from '@data/mutate/useCreate';
import { useNotify } from '../notification/useNotify';
import { useRedirect } from '../router/useRedirect';
import { useGetIdentity } from '../auth/useGetIdentity';
import { useCartProvider } from '../cart';

export type UseOrderPlaceParams = {
  onSuccessPlaceOrder?: (response: unknown) => void;
  onErrorPlaceOrder?: (response: unknown) => void;
  orderConfirmedUrl?: string;
  orderCanceledUrl?: string;
  orderEndpoint?: string;
};

export const useOrderPlace = ({
  orderEndpoint = 'orders',
  orderConfirmedUrl = '/order/confirmed',
  orderCanceledUrl = '/order/cancelled',
  onSuccessPlaceOrder,
  onErrorPlaceOrder,
}: UseOrderPlaceParams): UseOrderPlaceReturn => {
  const [createOrder] = useCreate();
  const { identity } = useGetIdentity();
  const redirect = useRedirect();
  const notify = useNotify();
  const { cart, data: lineItems, completeCart } = useCartProvider();

  const onPlaceOrder = async (payload: OnPlaceOrderPayload) => {
    const {
      payment_id,
      billing_details,
      payment_status = PaymentStatus.AWAITING,
      data: payloadData = {},
    } = payload;

    const customer_id = identity?.id as string;
    const email = billing_details?.email ?? identity?.email ?? 'guest@mail.com';
    const name =
      billing_details?.name ?? identity?.name ?? `${identity?.last_name} ${identity?.first_name}`;
    const first_name = billing_details?.first_name ?? identity?.first_name ?? '';
    const last_name = billing_details?.last_name ?? identity?.last_name ?? '';
    const phone = billing_details?.phone;

    const currency = cart.region?.currency;
    const currency_code = cart.region?.currency_code;

    const address = {
      ...billing_details?.address,
      id: '_shop_customer_id',
      customer_id,
      name,
      first_name,
      last_name,
      phone,
      has_account: !!identity?.id,
    };

    const customer = {
      id: customer_id,
      email,
      name,
      first_name,
      last_name,
      phone,
      billing_address: address,
    };

    const payment: Payment = {
      id: '_shop_pay_id',
      provider_id: payment_id,
      cart_id: cart.id,
      amount: cart.total,
      currency,
      currency_code,
      data: {
        ...payloadData,
      },
    };

    const order: Omit<Order, 'id'> = {
      object: 'order',
      display_id: +uniqueId(),
      external_id: null,
      draft_order_id: null,
      email,
      customer_id,
      customer,
      payment_status: payment_status,
      cart_id: cart.id,
      status: OrderStatus.PENDING,
      fulfillment_status: FulfillmentStatus.NOT_FULFILLED,
      items: lineItems || [],
      swaps: [],
      refunds: [],
      returns: [],
      fulfillments: [],
      claims: [],
      currency_code,
      currency,
      idempotency_key: cart.idempontency_key,
      no_notification: null,
      region: cart.region,
      region_id: cart.region_id,
      sales_channel_id: cart.sales_channel_id,
      sales_channel: cart.sales_channel,
      tax_rate: cart.region.tax_rate || null,
      tax_total: Number(cart.tax_total),
      subtotal: cart.subtotal,
      shipping_total: Number(cart.shipping_total),
      shipping_address_id: address.id,
      shipping_address: address,
      shipping_methods: [...cart.shipping_methods],
      billing_address_id: address.id,
      billing_address: address,
      refundable_amount: cart.total,
      total: cart.total,
      paid_total: cart.total,
      discount_total: 0,
      item_tax_total: 0,
      shipping_tax_total: 0,
      refunded_total: 0,
      payments: [payment],
      created_at: new Date(),
      canceled_at: null,
      metadata: {},
    };

    await createOrder(
      orderEndpoint,
      {
        data: order,
      },
      {
        onSuccess: response => {
          completeCart(cart.id);
          if (isFunction(onSuccessPlaceOrder)) {
            onSuccessPlaceOrder(response);
          }
          redirect({ to: `${orderConfirmedUrl}/${response?.id}`, type: 'replace' });
        },
        onError: async error => {
          if (isFunction(onErrorPlaceOrder)) {
            onErrorPlaceOrder(error);
          }
          onPlaceOrderError(error, { status: payment_status });
        },
      },
    );
  };

  const onPlaceOrderError = (error: unknown | null, urlQuery?: Record<string, unknown>) => {
    if (error instanceof Error) {
      notify(error.message.substring(0, 100), { type: 'error' });
    }
    if (urlQuery) {
      redirect({
        to: orderCanceledUrl,
        query: urlQuery,
        type: 'replace',
      });
    }
  };

  return [onPlaceOrder, onPlaceOrderError];
};

export type OnPlaceOrder = (data: OnPlaceOrderPayload) => void;
export type OnPlaceOrderError = (error: unknown, urlQuery?: Record<string, unknown>) => void;

export type UseOrderPlaceReturn = [OnPlaceOrder, OnPlaceOrderError];
