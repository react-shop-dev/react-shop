import 'server-only';
import Stripe from 'stripe';
import { initStripe } from './init';
import { CreatePaymentIntentParams, CreatePaymentIntentActionResult } from 'src/types';

export type CreatePaymentIntentAction = (
  secretKey: string,
  params: CreatePaymentIntentParams,
) => CreatePaymentIntentActionResult;

export async function createPaymentIntent(
  secretKey: string,
  params: CreatePaymentIntentParams,
): CreatePaymentIntentActionResult {
  'use server';
  const { idempotencyKey, amount, currency } = params;

  const stripe = initStripe(secretKey);

  try {
    const paymentIntent: Stripe.Response<Stripe.PaymentIntent> = await stripe.paymentIntents.create(
      {
        amount,
        currency,
        automatic_payment_methods: {
          enabled: true,
        },
      },
      {
        idempotencyKey,
        timeout: 500,
      },
    );
    // Avoid warning: "Only plain objects can be passed to Client Components from Server Components":
    return JSON.stringify(paymentIntent);
  } catch (error) {
    return JSON.stringify({ error });
  }
}
