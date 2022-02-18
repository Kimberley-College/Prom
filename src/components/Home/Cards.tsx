import {
  Box, Stack, Flex, Text, Icon,
} from '@chakra-ui/react';
import { GoLocation, GoKey } from 'react-icons/go';
import { GrCafeteria } from 'react-icons/gr';

const Cards: React.FC = () => (
  <Stack direction={['column', null, 'row']} spacing="24px" justify="center" align="center" mt={5} overflow="hidden" maxW="100vw">
    <Box w="300px" p={3} mt={3}>
      <Flex direction="column" align="center">
        <Icon as={GoLocation} boxSize={10} />
        <Text>Login to view the date and location of our prom</Text>
      </Flex>
    </Box>

    <Box w="300px" p={3} mt={3}>
      <Flex direction="column" align="center">
        <Icon as={GoKey} boxSize={10} />
        <Text>Food will be provided, as well as a non-alcoholic drink upon entry.</Text>
      </Flex>
    </Box>

    <Box w="300px" p={3} mt={3}>
      <Flex direction="column" align="center">
        <Icon as={GrCafeteria} boxSize={10} />
        <Text>
          Log in using your school email and password below to buy a ticket for £30.
        </Text>
      </Flex>
    </Box>
  </Stack>
);

export default Cards;
