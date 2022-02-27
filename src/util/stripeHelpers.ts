import { useToast } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

// eslint-disable-next-line import/prefer-default-export
export const usePaymentIntent = (userId?: null | string) => {
  const toast = useToast();
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    setClientSecret(null);
    if (!userId) return;
    const getIntent = async () => {
      const res = await fetch('/api/stripe/create-paymentintent', {
        method: 'POST',
        body: JSON.stringify({ userId }),
      });

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
  }, [userId]);

  if (userId === null) return null;

  return clientSecret;
};
