import { Spinner } from '@chakra-ui/react';
import { usePaymentIntent } from 'util/stripeHelpers';
import { Elements } from '@stripe/react-stripe-js';
import { getStripe } from 'util/getStripe';
import CheckoutForm from './CheckoutForm';

const CheckoutWrapper: React.FC = () => {
  const stripe = getStripe();
  const clientSecret = usePaymentIntent();

  const appearance = {
    theme: 'stripe',
  } as const;

  const options = {
    clientSecret,
    appearance,
  };

  if (clientSecret) {
    return (
      <Elements stripe={stripe} options={options}>
        <CheckoutForm />
      </Elements>
    );
  }

  return <Spinner />;
};

export default CheckoutWrapper;
