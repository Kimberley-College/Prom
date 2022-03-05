import { Flex, Heading, Box } from '@chakra-ui/react';
import { useTicket } from 'util/ticketContext';
import QRCode from 'qrcode.react';
import MoreInfo from './MoreInfo';

const HasTicket: React.FC = () => {
  const { ticket } = useTicket();
  return (
    <>
      <Flex direction="column" align="center" justify="center" m={5}>
        <Heading as="h2" my={3}>Your Ticket</Heading>
        <Box bgColor="brand.kimberley" w="300px" h="300px" boxSizing="content-box" borderRadius="15px" p={4}>
          <QRCode value={ticket.jwt} size={300} fgColor="white" bgColor="#711368" />
        </Box>

      </Flex>
      <MoreInfo />
    </>
  );
};

export default HasTicket;
