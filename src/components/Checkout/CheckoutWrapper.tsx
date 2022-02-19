import { useToast } from '@chakra-ui/react';
import type { PaymentIntent } from '@stripe/stripe-js';
import { useState, useEffect } from 'react';
import getStripe from '../../util/getStripe';

const CheckoutForm: React.FC = () => {
  const stripe = getStripe();
  const [paymentIntentSecret, setPaymentIntentSecret] = useState<PaymentIntent | null>(null);
  const toast = useToast();
  useEffect(() => {
    fetch('/api/create-paymentintent')
      .then((res) => res.json())
      .then((data) => setPaymentIntentSecret(data.clientSecret))
      .catch((err) => toast({
        title: err,
        status: 'error',
      }));
  }, [setPaymentIntentSecret, toast]);

  const appearance = {
    theme: stripe,
  };

  const options = {
    paymentIntentSecret,
    appearance,
  };
};

export default CheckoutForm;
