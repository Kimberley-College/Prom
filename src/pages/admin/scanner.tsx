import { QrReader } from 'react-qr-reader';
import type { OnResultFunction } from 'react-qr-reader';
import { Flex, Heading, useToast } from '@chakra-ui/react';
import BaseLayout from 'components/Layouts/Base';

const ViewFinder = () => (
  <svg
    viewBox="0 0 100 100"
    style={{
      top: 0,
      left: 0,
      zIndex: 1,
      boxSizing: 'border-box',
      border: '50px solid rgba(0, 0, 0, 0.3)',
      position: 'absolute',
      width: '100%',
      height: '100%',
    }}
  >
    <path
      fill="none"
      d="M13,0 L0,0 L0,13"
      stroke="rgba(255, 0, 0, 0.5)"
      strokeWidth="5"
    />
    <path
      fill="none"
      d="M0,87 L0,100 L13,100"
      stroke="rgba(255, 0, 0, 0.5)"
      strokeWidth="5"
    />
    <path
      fill="none"
      d="M87,100 L100,100 L100,87"
      stroke="rgba(255, 0, 0, 0.5)"
      strokeWidth="5"
    />
    <path
      fill="none"
      d="M100,13 L100,0 87,0"
      stroke="rgba(255, 0, 0, 0.5)"
      strokeWidth="5"
    />
  </svg>
);

const Scanner: React.FC = () => {
  const toast = useToast();

  const checkInTicket: OnResultFunction = async (result) => {
    if (!result) return;
    const ticket = result.getText();

    const res = await fetch('/api/tickets/checkIn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ticket }),
    });

    if (!res.ok) {
      toast({
        title: 'Error checking in ticket',
        status: 'error',
      });
      return;
    }

    const { name }: { name: string } = await res.json();

    toast({
      title: 'Ticket checked in',
      description: `Name: ${name}`,
      status: 'success',
    });
  };

  return (
    <BaseLayout>
      <Heading as="h1" size="3xl" textAlign="center" my={5}>Ticket Scanner</Heading>
      <Flex direction="column" justify="center" align="center" w="100%">
        <QrReader
          containerStyle={{ width: '500px', maxWidth: '80vw', height: '500px' }}
          videoStyle={{
            objectFit: 'cover',
          }}
          constraints={{ facingMode: 'environment' }}
          onResult={checkInTicket}
          ViewFinder={ViewFinder}
        />
      </Flex>
    </BaseLayout>
  );
};

export default Scanner;
