'use client';

import { useCheckoutContext, useCartProvider } from 'react-shop';
import { PaymentStatus, type OnPlaceOrderPayload } from 'react-shop-types';
import { useElements, useStripe } from '@stripe/react-stripe-js';
import type {
  BillingDetails,
  ConfirmCardPaymentData,
  PaymentIntent,
  PaymentIntentResult,
  PaymentMethod,
  PaymentMethodCreateParams,
  PaymentRequestPaymentMethodEvent,
  StripeCardElement,
  StripeCardNumberElement,
  StripeExpressCheckoutElementConfirmEvent,
} from '@stripe/stripe-js';
import { logError } from '../../utils';
import { PAYMENT_PROVIDER } from 'src/constants';

export const usePaymentConfirm = (): UsePaymentConfirmReturn => {
  const stripe = useStripe();
  const elements = useElements();
  const { onPlaceOrder, onPlaceOrderError } = useCheckoutContext();
  const { cart: { payment_session } = {} } = useCartProvider();

  let activeCardElement: StripeCardElement | StripeCardNumberElement | null;

  const determinePaymentMethod = ({
    billingDetails,
    isExpressPayment,
    paymentMethodId,
  }: {
    billingDetails?: StripeBillingDetails;
    isExpressPayment?: boolean;
    paymentMethodId?: string;
  }): Promise<PaymentIntentResult> => {
    if (!stripe) {
      return Promise.reject('Stripe.js has not loaded');
    }
    if (!elements) {
      logError('Use Element components from `@stripe-js/react`');
      return Promise.reject('Use Element components from `@stripe-js/react`');
    }

    if (
      elements?.getElement('payment') ||
      (isExpressPayment && elements?.getElement('expressCheckout'))
    ) {
      return stripe.confirmPayment({
        elements,
        redirect: 'if_required',
        clientSecret: payment_session?.data.client_secret,
        confirmParams: {
          return_url: window.location.href,
          payment_method_data: {
            ...(billingDetails ? { billing_details: billingDetails as BillingDetails } : {}),
          },
        },
      });
    }

    const cardElement = elements?.getElement('card');
    const cardNumberElement = elements?.getElement('cardNumber');
    activeCardElement = cardElement || cardNumberElement;

    if (paymentMethodId || activeCardElement) {
      const options = {
        payment_method: paymentMethodId || {
          card: activeCardElement,
          billing_details: billingDetails,
        },
      };

      return stripe.confirmCardPayment(
        payment_session?.data?.client_secret,
        options as ConfirmCardPaymentData,
        paymentMethodId ? { handleActions: false } : undefined,
      );
    } else {
      return Promise.reject('No valid payment element found');
    }
  };

  const handlePayment = async (params: HandlePaymentParams) => {
    if (!payment_session) {
      return Promise.reject('Payment session is not defined');
    }

    const event = isParamsIsPaymentRequestEvent(params)
      ? { params, _request: true }
      : isParamsIsExpressCheckoutEvent(params)
        ? { params, _express: true }
        : undefined;

    const billingDetails = event?._request
      ? event.params.paymentMethod.billing_details
      : event?._express
        ? event.params.billingDetails
        : (params as PaymentMethodCreateParams.BillingDetails);

    const getPaymentType = () => {
      let paymentType = 'payment';
      if (event?._request) {
        paymentType = event.params.walletName;
      }
      if (event?._express) {
        paymentType = event.params.expressPaymentType;
      }
      if (activeCardElement) {
        paymentType = 'card';
      }
      return paymentType;
    };

    try {
      const { error, paymentIntent } = await determinePaymentMethod({
        billingDetails,
        isExpressPayment: event?._express,
        paymentMethodId: event?._request ? event.params.paymentMethod.id : undefined,
      });

      if (error) {
        event?._request && event?.params.complete('fail');
        event?._express && event.params.paymentFailed();

        activeCardElement?.focus();

        if (completeStatuses.includes(String(error.payment_intent?.status))) {
          onPlaceOrderError(error, {
            status: error.payment_intent?.status,
            code: error.code,
            type: error.type,
          });
        }
        return Promise.reject(error.message);
      }

      if (paymentIntent && completeStatuses.includes(paymentIntent.status)) {
        const data: OnPlaceOrderPayload = {
          payment_id: PAYMENT_PROVIDER,
          billing_details: transformBillindDetails(billingDetails),
          payment_status: paymentStatusMap[paymentIntent.status],

          data: { ...paymentIntent, payment_type: getPaymentType() },
        };
        onPlaceOrder(data);

        event?._request && event?.params.complete('success');
      }

      return paymentIntent;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return handlePayment;
};

const completeStatuses = ['requires_capture', 'succeeded'];

type HandlePaymentParams =
  | PaymentMethodCreateParams.BillingDetails
  | PaymentRequestPaymentMethodEvent
  | StripeExpressCheckoutElementConfirmEvent;

type UsePaymentConfirmReturn = (params: HandlePaymentParams) => void;

type StripeBillingDetails =
  | PaymentMethodCreateParams.BillingDetails
  | PaymentMethod.BillingDetails
  | BillingDetails;

const transformBillindDetails = (
  billingDetails: StripeBillingDetails = {},
): OnPlaceOrderPayload['billing_details'] => {
  const { email, name, phone, address } = billingDetails;

  return {
    email,
    name,
    first_name: name?.split(' ')[0],
    last_name: name?.split(' ')[1],
    phone,
    address: {
      country_code: address?.country,
      city: address?.city,
      postal_code: address?.postal_code,
      province: address?.state,
      address_1: address?.line1,
      address_2: address?.line2,
    },
  };
};

const paymentStatusMap: Record<PaymentIntent.Status, PaymentStatus> = {
  requires_payment_method: PaymentStatus.NOT_PAID,
  requires_confirmation: PaymentStatus.REQUIRES_ACTION,
  requires_capture: PaymentStatus.REQUIRES_ACTION,
  requires_action: PaymentStatus.REQUIRES_ACTION,
  processing: PaymentStatus.AWAITING,
  canceled: PaymentStatus.CANCELED,
  succeeded: PaymentStatus.CAPTURED,
};

function isParamsIsPaymentRequestEvent(
  params: HandlePaymentParams,
): params is PaymentRequestPaymentMethodEvent {
  return !!(params as PaymentRequestPaymentMethodEvent).complete;
}

function isParamsIsExpressCheckoutEvent(
  params: HandlePaymentParams,
): params is StripeExpressCheckoutElementConfirmEvent {
  return !!(params as StripeExpressCheckoutElementConfirmEvent).expressPaymentType;
}
