import {
  Flex, Button, useToast, Spinner, Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { usePaymentIntent } from 'util/stripeHelpers';
import type {
  Terminal, Reader, ExposedError, ISdkManagedPaymentIntent, IPaymentIntent,
} from '@stripe/terminal-js';
import { getStripeTerminal } from 'util/getStripe';

interface Props {
  userId: null | string;
  setUserId: (userId: string) => void;
}

const TerminalStuff: React.FC<Props> = ({ userId, setUserId }) => {
  const toast = useToast();
  const clientSecret = usePaymentIntent(userId, true);
  const [terminal, setTerminal] = useState<Terminal | null>(null);
  const [reader, setReader] = useState<Reader | null>(null);
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
      setReader(null);
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

    setReader(connectResult.reader);

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
    const paymentMethod: { error?: ExposedError, paymentIntent?: ISdkManagedPaymentIntent } | void = await terminal.collectPaymentMethod(clientSecret).catch(() => setReader(null));

    if (!paymentMethod) {
      return toast({
        title: 'Disconnected from reader',
        status: 'error',
      });
    }

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
      setUserId('');
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
  const disconnectReader = async () => terminal.disconnectReader()
    .then(() => setReader(null))
    .then(() => toast({ title: 'Disconnected from reader', status: 'success' }));

  if (loading) return <Spinner />;

  return (
    <Flex direction="column">
      <Text>Reader: {reader?.status ?? 'disconnected'}</Text>
      <Flex gap={3} wrap="wrap">
        <Button onClick={discoverReaders} disabled={!!reader}>Connect to Reader</Button>
        <Button onClick={setDisplay} disabled={!reader}>Set Terminal Display</Button>
        <Button onClick={clearDisplay} disabled={!reader}>Clear Terminal Display</Button>
        <Button onClick={collectPayment} disabled={!clientSecret || !reader}>Collect Payment</Button>
        <Button onClick={clearPayment} disabled={!clientSecret || !reader}>Clear Payment</Button>
        <Button onClick={disconnectReader} disabled={!reader}>Disconnect Reader</Button>
      </Flex>
    </Flex>
  );
};

export default TerminalStuff;
