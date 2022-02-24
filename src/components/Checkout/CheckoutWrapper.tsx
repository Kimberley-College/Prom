import { useToast, Spinner } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import getStripe from 'util/getStripe';
import CheckoutForm from './CheckoutForm';

interface Props {
  updateTicket: () => Promise<void>;
}

const CheckoutWrapper: React.FC<Props> = ({ updateTicket }) => {
  const stripe = getStripe();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const toast = useToast();
  useEffect(() => {
    const getIntent = async (): Promise<void> => {
      const res = await fetch('/api/stripe/create-paymentintent');

      const data = await res.json();

      if (!res.ok) {
        toast({
          title: data.error,
          status: 'error',
        });
        return;
      }

      setClientSecret(data.clientSecret);
    };

    getIntent();
  }, [setClientSecret, toast]);

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
        <CheckoutForm updateTicket={updateTicket} />
      </Elements>
    );
  }

  return <Spinner />;
};

export default CheckoutWrapper;
