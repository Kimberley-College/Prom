import {
  Flex, Heading, Button, Box,
} from '@chakra-ui/react';

const Header: React.FC = () => (
  <Flex direction="column" p="5vw" pt={['150px', null, null, '100px', '350px']} bgImg="/KimberleyBg.png" bgRepeat="no-repeat" bgSize="cover" bgPosition="top" backdropFilter="blur(5px)" backgroundColor="rgba(0,0,0,0.6)" align="flex-start" justify="center" h="600px" maxH="100vh" gap={10}>
    <Box h="100%" w="100%" pos="absolute" top={0} left={0} backdropFilter="blur(5px)" bgColor="rgba(255,255,255,0.2)" zIndex={-1} />
    <Heading color="black" as="h1" size="3xl" fontWeight="bold">Kimberley College Prom</Heading>
    <Button colorScheme="purple">Sign in with Office</Button>
  </Flex>
);

export default Header;
