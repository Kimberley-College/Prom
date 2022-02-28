import { type Stripe, loadStripe } from '@stripe/stripe-js';
import { type StripeTerminal as StripeTerminalType, loadStripeTerminal } from '@stripe/terminal-js';

type StripePromise = Promise<Stripe | null>;

let stripePromise: StripePromise;

export const getStripe = (): StripePromise => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

let StripeTerminal: Promise<StripeTerminalType | null>;

export const getStripeTerminal = (): Promise<StripeTerminalType | null> => {
  if (!StripeTerminal) {
    StripeTerminal = loadStripeTerminal();
  }
  return StripeTerminal;
};
