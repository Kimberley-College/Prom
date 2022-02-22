import { useEffect, useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import {
  useToast, Flex, Button, Text, Link,
} from '@chakra-ui/react';
import NextLink from 'next/link';

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
      <Text mt={3}>By clicking &apos;Pay now&apos; you hereby agree to our <NextLink href="/terms" passHref><Link href="/terms">Terms and Conditions</Link></NextLink> and <NextLink href="/privacy" passHref><Link href="/privacy">Privacy Policy</Link></NextLink></Text>
      <Button disabled={!stripe || !elements || loading} isLoading={loading} onClick={handleSubmit} mt={3}>Pay now</Button>
    </Flex>
  );
};

export default CheckoutForm;
