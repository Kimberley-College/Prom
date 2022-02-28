import { useToast } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

// eslint-disable-next-line import/prefer-default-export
export const usePaymentIntent = (userId?: string, terminal = false) => {
  const toast = useToast();
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    setClientSecret(null);
    if (userId === '') return;
    const getIntent = async () => {
      const res = await fetch('/api/stripe/create-paymentintent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, terminal }),
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
