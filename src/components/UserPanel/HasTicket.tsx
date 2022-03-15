import { Flex, Heading } from '@chakra-ui/react';
import { useTicket } from 'util/ticketContext';
import MoreInfo from './MoreInfo';
import QR from './QR';

const HasTicket: React.FC = () => {
  const { ticket } = useTicket();
  return (
    <>
      <Flex direction="column" align="center" justify="center" m={5}>
        <Heading as="h2" my={3}>Your Ticket</Heading>
        <QR jwt={ticket.jwt} />
      </Flex>
      <MoreInfo />
    </>
  );
};

export default HasTicket;
