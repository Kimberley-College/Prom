import {
  Flex, Box, Spacer, Center, Spinner,
} from '@chakra-ui/react';
import NavBar from '../Nav/NavBar';
import Banner from './Banner';
import Footer from './Footer';

interface Props {
  isLoading?: boolean
}

const BaseLayout: React.FC<Props> = ({ children, isLoading }) => (
  <Flex flexFlow="column nowrap" align="center" w="100%" maxW="100%" minH="100vh" boxSizing="border-box" bgColor="gray.100">
    <Box w="100%" zIndex={100}>
      <Banner />
    </Box>
    <Box w="100%" zIndex={99}>
      <NavBar />
    </Box>
    <Box w={['90%', null, '80%', '70%']}>
      {isLoading ? <Center><Spinner size="xl" /></Center> : children}
    </Box>
    <Spacer />
    <Box w="100%">
      <Footer />
    </Box>
  </Flex>
);

export default BaseLayout;
