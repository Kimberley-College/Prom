import { Flex, Box } from '@chakra-ui/react';
import NavBar from '../Nav/NavBar';
import Footer from './Footer';

const BaseLayout: React.FC = ({ children }) => (
  <Flex flexFlow="column nowrap" w="100%" maxW="100%" minH="100vh" boxSizing="border-box" bgColor="#EDF2F7">
    <Box pos="absolute" w="100%" zIndex={100}>
      <NavBar />
    </Box>
    {children}
    <Footer />
  </Flex>
);

export default BaseLayout;
