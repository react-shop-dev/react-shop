import {
  Payment,
  ShippingMethod,
  type LineItem,
  type Order,
  PaymentStatus,
  Product,
  ShippingOption,
} from 'react-shop-types';
import type { Currency } from '@faker-js/faker';
import { faker } from './faker';
import { ORDER_STATUS, PAYMENTS, CART_ID } from './constants';
import { Session } from './cart';
import { salesChannel } from './shared';
import type { Db } from './types';

const TEST_ORDER_ID = '0';
let DISPLAY_ORDER_ID = 0;

export const generateOrders = (db: Db): Order[] => {
  const { products, customers, session, shipping } = db;
  const customer = customers[0];
  const cart = session[0]?.cart;
  const region = cart?.region;
  const tax_total = 0;

  const { lineItems, subtotal } = generateOrderItems(products);

  const paymentStatus = faker.helpers.enumValue(PaymentStatus);
  const orderStatus = generateOrderStatus(paymentStatus);

  const shippingMethod = generateShippingMethod(cart, shipping[0]);
  const total = subtotal + shippingMethod.price + tax_total;

  const payment = generatePayment({ amount: total, cart, currency_code: region?.currency_code });

  const items = lineItems.map(item => ({
    ...item,
    tax_total,
    total,
    original_total: total,
    original_tax_total: tax_total,
    subtotal,
  }));

  return [
    {
      object: 'order',
      id: TEST_ORDER_ID,
      display_id: DISPLAY_ORDER_ID++,
      external_id: null,
      draft_order_id: null,
      status: orderStatus,
      payment_status: paymentStatus,
      email: customer.email,
      cart_id: cart?.id || CART_ID,
      customer_id: customer.id,
      customer,
      idempotency_key: cart?.idempontency_key,
      billing_address_id: customer.billing_address_id ?? null,
      billing_address: customer.shipping_addresses![0],
      shipping_address_id: customer.shipping_addresses![0].id,
      shipping_address: customer.shipping_addresses![0],
      payments: [payment],
      items,
      swaps: [],
      refunds: [],
      returns: [],
      fulfillments: [],
      claims: [],
      no_notification: null,
      region_id: cart?.region?.id,
      region,
      sales_channel_id: salesChannel.id,
      sales_channel: salesChannel,
      currency: region?.currency,
      currency_code: region?.currency_code,
      tax_rate: null,
      subtotal,
      tax_total,
      shipping_total: shippingMethod.price,
      shipping_methods: [shippingMethod],
      total,
      refundable_amount: total,
      paid_total: total,
      discount_total: 0,
      refunded_total: 0,
      item_tax_total: 0,
      shipping_tax_total: 0,
      canceled_at: null,
      created_at: faker.date.past({ years: 1 }),
      metadata: {},
    },
  ];
};

const generateOrderItems = (products: Product[]): { lineItems: LineItem[]; subtotal: number } => {
  const lineItems: LineItem[] = [];
  let subtotal = 0;

  Array.from(
    Array(
      faker.helpers.weightedArrayElement([
        { value: 1, weight: 4 },
        { value: 2, weight: 3 },
        { value: 3, weight: 3 },
      ]),
    ),
  ).forEach(() => {
    const productIndex = faker.number.int({ min: 0, max: products.length - 1 });
    const product = products[productIndex];

    const existingItemIndex = lineItems.findIndex(item => item.product_id === product.id);

    const lineItemId = `item_${faker.string.uuid()}`;

    if (existingItemIndex !== -1) {
      (lineItems[existingItemIndex].quantity as number) += 1;
    } else {
      lineItems.push({
        id: lineItemId,
        title: product.title,
        variant_id: product.variants![0].id,
        variant: product.variants![0],
        sales_channel_id: salesChannel.id,
        sales_channel: salesChannel,
        order_id: TEST_ORDER_ID,
        order_edit_id: null,
        cart_id: CART_ID,
        description: product.description,
        thumbnail: product.thumbnail,
        product_id: product.id,
        original_item_id: null,
        unit_price: product.price.calculated_price,
        allow_discounts: product.discountable,
        quantity: 1,
        created_at: faker.date.past({ years: 1 }),
        is_return: false,
        should_merge: true,
        has_shipping: false,
        fulfilled_quantity: null,
        returned_quantity: null,
        shipped_quantity: null,
        adjustments: [],
        metadata: {},
        tax_lines: [
          {
            rate: 0,
            name: 'default',
            code: 'default',
            item_id: lineItemId,
          },
        ],
      });
    }

    subtotal += product.price.calculated_price;
  });

  return { lineItems, subtotal };
};

const generateShippingMethod = (
  cart: Session['cart'],
  shippingOption: ShippingOption,
): ShippingMethod => ({
  id: `sm_${faker.string.uuid()}`,
  shipping_option: shippingOption,
  shipping_option_id: shippingOption.id,
  cart_id: cart?.id,
  price: shippingOption.amount as number,
  includes_tax: false,
  order_id: TEST_ORDER_ID,
});

const generatePayment = ({
  amount,
  cart,
  currency_code,
}: {
  amount: number;
  cart: Session['cart'];
  currency_code: Currency['code'];
}): Payment => ({
  id: `pay_${faker.string.uuid()}`,
  order_id: TEST_ORDER_ID,
  amount,
  cart_id: cart?.id,
  currency_code,
  currency: cart?.region?.currency,
  provider_id: PAYMENTS.manual.id,
  data: {
    card_last4: faker.finance.creditCardNumber().slice(-4),
  },
});

const generateOrderStatus = (paymentStatus: PaymentStatus) => {
  switch (paymentStatus) {
    case PaymentStatus.AWAITING:
      return faker.helpers.weightedArrayElement([
        { value: ORDER_STATUS.PENDING, weight: 7 },
        { value: ORDER_STATUS.REQUIRES_ACTION, weight: 3 },
      ]);
    case PaymentStatus.CANCELED:
    case PaymentStatus.REFUNDED:
    case PaymentStatus.PARTIALLY_REFUNDED:
      return ORDER_STATUS.CANCELED;
    case PaymentStatus.CAPTURED:
      return faker.helpers.weightedArrayElement([
        { value: ORDER_STATUS.COMPLETED, weight: 8 },
        { value: ORDER_STATUS.REQUIRES_ACTION, weight: 2 },
      ]);
    case PaymentStatus.REQUIRES_ACTION:
      return ORDER_STATUS.REQUIRES_ACTION;
    default:
      return ORDER_STATUS.PENDING;
  }
};
