import {
  Box, Flex, Text, Icon,
} from '@chakra-ui/react';
import { GoLocation } from 'react-icons/go';
import { IoTicketSharp } from 'react-icons/io5';
import { GrCafeteria } from 'react-icons/gr';
import { useUser } from '@supabase/supabase-auth-helpers/react';

const Cards: React.FC = () => {
  const { user } = useUser();
  return (
    <Flex direction={['column', null, 'row']} justify="center" mt={10} align="center" id="cards">
      <Box w="330px" h="240px" p={3} mt={3}>
        <Flex direction="column" align="center">
          <Icon as={GoLocation} boxSize={10} />
          {user
            ? <Text fontSize="24" align="center">The prom will take place at the Sharnbrook Hotel on the 8th July, from 7pm to 11pm.</Text>
            : <Text fontSize="24" align="center">Use your school email and password to sign in and view the date and location.</Text>}
        </Flex>
      </Box>

      <Box w="330px" h="240px" p={3} mt={3}>
        <Flex direction="column" align="center">
          <Icon as={GrCafeteria} boxSize={10} />
          <Text fontSize="24" align="center">Food will be provided, as well as a non-alcoholic drink upon entry. You will be able to purchase alcoholic drinks at the bar.</Text>
        </Flex>
      </Box>

      <Box w="330px" h="240px" p={3} mt={3}>
        <Flex direction="column" align="center">
          <Icon as={IoTicketSharp} boxSize={10} />
          <Text fontSize="24" align="center">
            Tickets cost £{(parseInt(process.env.NEXT_PUBLIC_TICKET_PRICE, 10) / 100).toFixed(2)} - any profits from the event will go to charity.
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Cards;
