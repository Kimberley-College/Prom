import { Flex, Heading, useToast } from '@chakra-ui/react';
import BaseLayout from 'components/Layouts/Base';
import QRScanner from 'components/Scanner/QRScanner';

const Scanner: React.FC = () => {
  const toast = useToast();

  const checkInTicket = async (result: string) => {
    if (!result) return;

    const res = await fetch('/api/tickets/checkIn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ticket: result }),
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
        <QRScanner onSuccess={checkInTicket} onError={console.log} verbose={false} disableFlip />
      </Flex>
    </BaseLayout>
  );
};

export default Scanner;
