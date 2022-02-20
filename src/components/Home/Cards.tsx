import {
  Box, Flex, Text, Icon,
} from '@chakra-ui/react';
import { GoLocation, GoKey } from 'react-icons/go';
import { GrCafeteria } from 'react-icons/gr';
import { useUser } from '@supabase/supabase-auth-helpers/react';

const Cards: React.FC = () => {
  const { user } = useUser();
  return (
    <Flex direction={['column', null, 'row']} justify="center" mt={10} align="center">
      <Box w="330px" h="240px" p={3} mt={3}>
        <Flex direction="column" align="center">
          <Icon as={GoLocation} boxSize={10} />
          {user
            ? <Text fontSize="24" align="center">Go to the user panel to view the date and location of our prom.</Text>
            : <Text fontSize="24" align="center">Login to view the date and location of our prom.</Text>}
        </Flex>
      </Box>

      <Box w="330px" h="240px" p={3} mt={3}>
        <Flex direction="column" align="center">
          <Icon as={GrCafeteria} boxSize={10} />
          <Text fontSize="24" align="center">Food will be provided, as well as a non-alcoholic drink upon entry.</Text>
        </Flex>
      </Box>

      <Box w="330px" h="240px" p={3} mt={3}>
        <Flex direction="column" align="center">
          <Icon as={GoKey} boxSize={10} />
          <Text fontSize="24" align="center">
            Log in using your school email and password above to buy a ticket for £30.
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Cards;
