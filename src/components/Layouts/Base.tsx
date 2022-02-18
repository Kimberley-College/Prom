import { Flex, Box } from '@chakra-ui/react';
import NavBar from '../Nav/NavBar';

const BaseLayout: React.FC = ({ children }) => (
  <Flex flexFlow="column nowrap" w="100vw" maxW="100vw" minH="100vh" boxSizing="border-box">
    <Box pos="absolute" w="100vw" zIndex={100}>
      <NavBar />
    </Box>
    {children}
  </Flex>
);

export default BaseLayout;
