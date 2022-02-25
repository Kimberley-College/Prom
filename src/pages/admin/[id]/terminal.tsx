import type { NextPage } from 'next';
import {
  Heading, useToast, Button,
} from '@chakra-ui/react';
import BaseLayout from 'components/Layouts/Base';
import { getStripeTerminal } from 'util/getStripe';
import { useEffect, useState } from 'react';
import type {
  Terminal, Reader, ExposedError, ISdkManagedPaymentIntent, IPaymentIntent,
} from '@stripe/terminal-js';
import { usePaymentIntent } from 'util/stripeHelpers';

const TerminalPage: NextPage = () => {
  const toast = useToast();
  const [terminal, setTerminal] = useState<Terminal | null>(null);
  const clientSecret = usePaymentIntent();

  const runStripeTerminal = async () => {
    const StripeTerminal = await getStripeTerminal();

    const fetchConnectionToken = async (): Promise<string> => {
      const { secret }: { secret: string } = await fetch('/api/stripe/connection-token').then((res) => res.json());
      return secret;
    };

    const unexpectedDisconnect = () => toast({
      title: 'Unexpected Disconnect',
      status: 'error',
    });

    const createdTerminal = StripeTerminal.create({
      onFetchConnectionToken: fetchConnectionToken,
      onUnexpectedReaderDisconnect: unexpectedDisconnect,
    });

    setTerminal(createdTerminal);

    const connectReader = async (discoverResult: { discoveredReaders?: Reader[]; error?: ExposedError; }) => {
      const selectedReader = discoverResult.discoveredReaders[0];

      const connectResult : { reader?: Reader, error?: ExposedError } = await createdTerminal.connectReader(selectedReader);

      if (connectResult.error) {
        return toast({
          title: 'Failed to connect',
          description: connectResult.error.message,
        });
      }

      return toast({
        title: 'Connected to reader',
        description: `Reader ID ${connectResult.reader.id}`,
        status: 'success',
      });
    };

    const discoverReaders = async () => {
      const config = {
        simulated: false,
        location: process.env.NEXT_PUBLIC_STRIPE_TERMINAL_LOCATION,
      };

      const discoverResult : { discoveredReaders?: Reader[], error?: ExposedError } = await createdTerminal.discoverReaders(config);

      if (discoverResult.error) {
        return toast({
          title: 'Failed to discover readers',
          status: 'error',
        });
      }

      if (discoverResult.discoveredReaders.length === 0) {
        return toast({
          title: 'No readers found',
          status: 'error',
        });
      }

      return connectReader(discoverResult);
    };

    discoverReaders();
  };

  useEffect(() => {
    runStripeTerminal();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setDisplay = () => {
    const PRICE = 30 * 100; // £30
    terminal?.setReaderDisplay({
      type: 'cart',
      cart: {
        line_items: [
          {
            description: 'Kimberley College Prom Ticket 2022',
            amount: PRICE,
            quantity: 1,
          },
        ],
        tax: 0,
        total: PRICE,
        currency: 'gbp',
      },
    });
  };

  const collectPayment = async () => {
    const paymentMethod: { error?: ExposedError, paymentIntent?: ISdkManagedPaymentIntent } = await terminal.collectPaymentMethod(clientSecret);
    if (paymentMethod.error) {
      return toast({
        title: 'Payment Method Errored',
        description: paymentMethod.error.message,
        status: 'error',
      });
    }

    const paymentRes: { error?: ExposedError, paymentIntent?: IPaymentIntent } = await terminal.processPayment(paymentMethod.paymentIntent);

    if (paymentRes.error) {
      return toast({
        title: 'Payment Processing Errored',
        description: paymentRes.error.message,
        status: 'error',
      });
    }

    const res = await fetch('/api/stripe/capture-intent', {
      method: 'POST',
      body: JSON.stringify({ paymentIntentId: paymentRes.paymentIntent.id }),
    });

    if (res.ok) {
      return toast({
        title: 'Payment Processed',
        description: 'Payment was successful',
        status: 'success',
      });
    }

    return toast({
      title: 'Payment Processing Errored',
      description: 'Payment was not successful',
      status: 'error',
    });
  };

  const clearDisplay = async () => terminal.clearReaderDisplay();
  const clearPayment = async () => terminal.cancelCollectPaymentMethod();
  const disconnectReader = async () => terminal.disconnectReader();

  return (
    <BaseLayout>
      <Heading as="h1" size="3xl">Stripe Terminal</Heading>
      <Button onClick={setDisplay}>Set Terminal Display</Button>
      <Button onClick={clearDisplay}>Clear Terminal Display</Button>
      <Button onClick={collectPayment}>Collect Payment</Button>
      <Button onClick={clearPayment}>Clear Payment</Button>
      <Button onClick={disconnectReader}>Disconnect Reader</Button>
    </BaseLayout>
  );
};
export default TerminalPage;
