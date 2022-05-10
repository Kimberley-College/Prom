import { Spinner, Text } from '@chakra-ui/react';
import { usePaymentIntent } from 'util/stripeHelpers';
import { Elements } from '@stripe/react-stripe-js';
import { getStripe } from 'util/getStripe';
import CheckoutForm from './CheckoutForm';

interface Props {
  purchasesEnabled: boolean;
}

const CheckoutWrapper: React.FC<Props> = ({ purchasesEnabled }) => {
  const stripe = getStripe();
  const clientSecret = usePaymentIntent();
  if (purchasesEnabled === false) {
    return <Text>Sorry - purchases are disabled.</Text>;
  }

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
