import { Stripe, loadStripe } from '@stripe/stripe-js';

type StripePromise = Promise<Stripe | null>;

let stripePromise: StripePromise;

const getStripe = (): StripePromise => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

export default getStripe;
