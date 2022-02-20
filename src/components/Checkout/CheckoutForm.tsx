import { useEffect, useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useToast, Flex, Button } from '@chakra-ui/react';

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const toast = useToast();

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!stripe) return;
    const clientSecret = new URLSearchParams(window.location.search).get('payment_intent_client_secret');
    if (!clientSecret) return;

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case 'succeeded':
          toast({ status: 'success', title: 'Payment succeeded!' });
          break;
        case 'processing':
          toast({ status: 'info', title: 'Your payment is processing.' });
          break;
        case 'requires_payment_method':
          toast({ status: 'error', title: 'Your payment was not successful, please try again.' });
          break;
        default:
          toast({ status: 'error', title: 'Something went wrong.' });
          break;
      }
    });
  }, [stripe, toast]);

  const handleSubmit = async (e): Promise<void> => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/payment/complete',
      },
    });

    if (error) {
      toast({ status: 'error', title: error.message });
    }

    setLoading(false);
  };

  return (
    <Flex flexFlow="column nowrap">
      <PaymentElement />
      <Button disabled={!stripe || !elements || loading} isLoading={loading} onClick={handleSubmit} mt={5}>Pay now</Button>
    </Flex>
  );
};

export default CheckoutForm;
