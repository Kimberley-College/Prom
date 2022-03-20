import type { NextPage } from 'next';
import HasTicket from 'components/UserPanel/HasTicket';
import NoTicket from 'components/UserPanel/NoTicket';
import BaseLayout from 'components/Layouts/Base';
import { useTicket } from 'util/ticketContext';
import { Spinner, Heading, Center } from '@chakra-ui/react';

const Panel: NextPage = () => {
  const { ticket, isLoading } = useTicket();
  return (
    <BaseLayout>
      <Heading as="h1" size="3xl" textAlign="center">User Panel</Heading>
      {isLoading ? <Center><Spinner size="xl" /></Center> : ticket ? <HasTicket /> : <NoTicket />}
    </BaseLayout>
  );
};

export default Panel;
