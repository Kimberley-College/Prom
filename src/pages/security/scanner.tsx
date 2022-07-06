import {
  Flex, Heading, useToast, Box,
} from '@chakra-ui/react';
import BaseLayout from 'components/Layouts/Base';
import { OnResultFunction, QrReader } from 'react-qr-reader';
import ViewFinder from 'components/Admin/ViewFinder';

const Scanner: React.FC = () => {
  const toast = useToast();

  const checkInTicket: OnResultFunction = async (result) => {
    if (!result) return;
    const data = result.getText();

    const res = await fetch('/api/tickets/checkIn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ticket: data }),
    });

    if (!res.ok) {
      toast({
        title: 'Error checking in ticket',
        status: 'error',
      });
      return;
    }

    const { name, alreadyChecked }: { name: string, alreadyChecked: boolean } = await res.json();

    if (alreadyChecked) {
      toast({
        title: 'Ticket already checked in',
        description: `Name: ${name}`,
        status: 'warning',
      });
      return;
    }

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
        <Box minW="300px" w="90%" maxW="500px" h="90vh">
          <QrReader
            onResult={checkInTicket}
            constraints={{ facingMode: 'environment' }}
            containerStyle={{ width: '100%', height: '100%' }}
            videoContainerStyle={{ width: '100%', height: '100%' }}
            videoStyle={{ objectFit: 'cover' }}
            ViewFinder={ViewFinder}
          />
        </Box>
      </Flex>
    </BaseLayout>
  );
};

export default Scanner;
