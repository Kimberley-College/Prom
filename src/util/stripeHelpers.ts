import { useToast } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

// eslint-disable-next-line import/prefer-default-export
export const usePaymentIntent = () => {
  const toast = useToast();
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    const getIntent = async () => {
      const res = await fetch('/api/stripe/create-paymentintent');

      const data = await res.json();

      if (!res.ok) {
        return toast({
          title: data.error,
          status: 'error',
        });
      }

      return setClientSecret(data.clientSecret);
    };
    getIntent();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return clientSecret;
};
