import {
  Flex, Button, useToast, Spinner,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { usePaymentIntent } from 'util/stripeHelpers';
import type {
  Terminal, Reader, ExposedError, ISdkManagedPaymentIntent, IPaymentIntent,
} from '@stripe/terminal-js';
import { getStripeTerminal } from 'util/getStripe';

interface Props {
  userId: null | string;
}

const TerminalStuff: React.FC<Props> = ({ userId }) => {
  const toast = useToast();
  const clientSecret = usePaymentIntent(userId, true);
  const [terminal, setTerminal] = useState<Terminal | null>(null);
  const [loading, setLoading] = useState(true);

  const runStripeTerminal = async () => {
    const StripeTerminal = await getStripeTerminal();

    const fetchConnectionToken = async (): Promise<string> => {
      const { secret }: { secret: string } = await fetch('/api/stripe/connection-token').then((res) => res.json());
      return secret;
    };

    const unexpectedDisconnect = () => {
      toast({
        title: 'Unexpected Disconnect',
        status: 'error',
      });
    };

    const createdTerminal = StripeTerminal.create({
      onFetchConnectionToken: fetchConnectionToken,
      onUnexpectedReaderDisconnect: unexpectedDisconnect,
    });

    setTerminal(createdTerminal);
  };

  useEffect(() => {
    runStripeTerminal();
    setLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const connectReader = async (discoverResult: { discoveredReaders?: Reader[]; error?: ExposedError; }) => {
    const selectedReader = discoverResult.discoveredReaders[0];

    const connectResult : { reader?: Reader, error?: ExposedError } = await terminal.connectReader(selectedReader);

    if (connectResult.error) {
      return toast({
        title: 'Failed to connect',
        description: connectResult.error.message,
        status: 'error',
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

    const discoverResult : { discoveredReaders?: Reader[], error?: ExposedError } = await terminal.discoverReaders(config);

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
      headers: {
        'Content-Type': 'application/json',
      },
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
      description: `Payment was not successful - PaymentIntent status is ${res}`,
      status: 'error',
    });
  };

  const clearDisplay = async () => terminal.clearReaderDisplay();
  const clearPayment = async () => terminal.cancelCollectPaymentMethod();
  const disconnectReader = async () => terminal.disconnectReader().then(() => toast({ title: 'Disconnected from reader', status: 'success' }));

  if (loading) return <Spinner />;

  return (
    <Flex direction="column">
      <Flex gap={3} wrap="wrap">
        <Button onClick={discoverReaders}>Discover Readers</Button>
        <Button onClick={setDisplay}>Set Terminal Display</Button>
        <Button onClick={clearDisplay}>Clear Terminal Display</Button>
        <Button onClick={collectPayment} disabled={!clientSecret}>Collect Payment</Button>
        <Button onClick={clearPayment} disabled={!clientSecret}>Clear Payment</Button>
        <Button onClick={disconnectReader}>Disconnect Reader</Button>
      </Flex>
    </Flex>
  );
};

export default TerminalStuff;
