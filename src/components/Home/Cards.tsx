import {
  Box, Flex, Text, Icon,
} from '@chakra-ui/react';
import { GoLocation, GoKey } from 'react-icons/go';
import { GrCafeteria } from 'react-icons/gr';

const Cards: React.FC = () => (
  <Flex direction={['column', null, 'row']} justify="center" align="center">
    <Box w="330px" h="240px" p={3} mt={3}>
      <Flex direction="column" align="center">
        <Icon as={GoLocation} boxSize={10} />
        <Text fontSize="24">Login to view the date and location of our prom.</Text>
      </Flex>
    </Box>

    <Box w="330px" h="240px" p={3} mt={3}>
      <Flex direction="column" align="center">
        <Icon as={GoKey} boxSize={10} />
        <Text fontSize="24">Food will be provided, as well as a non-alcoholic drink upon entry.</Text>
      </Flex>
    </Box>

    <Box w="330px" h="240px" p={3} mt={3}>
      <Flex direction="column" align="center">
        <Icon as={GrCafeteria} boxSize={10} />
        <Text fontSize="24">
          Log in using your school email and password below to buy a ticket for £30.
        </Text>
      </Flex>
    </Box>
  </Flex>
);

export default Cards;
