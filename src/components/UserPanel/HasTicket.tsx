import { Flex, Text } from '@chakra-ui/react';
import { useTicket } from 'util/ticketContext';
import MoreInfo from './MoreInfo';

const HasTicket: React.FC = () => {
  const { ticket } = useTicket();
  return (
    <>
      <Flex h="500px" align="center" justify="center">
        Your ticket goes here.
      </Flex>
      <Text>{JSON.stringify(ticket)}</Text>
      <MoreInfo />
    </>
  );
};

export default HasTicket;
