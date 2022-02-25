import type { NextPage } from 'next';
import HasTicket from 'components/UserPanel/HasTicket';
import NoTicket from 'components/UserPanel/NoTicket';
import BaseLayout from 'components/Layouts/Base';
import { useTicket } from 'util/ticketContext';
import { Spinner } from '@chakra-ui/react';

const Panel: NextPage = () => {
  const { ticket, isLoading } = useTicket();
  return (
    <BaseLayout>
      {isLoading ? <Spinner /> : ticket ? <HasTicket /> : <NoTicket />}
    </BaseLayout>
  );
};

export default Panel;
