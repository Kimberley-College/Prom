import {
  Flex, Image, Text, Spacer, Button, Icon,
} from '@chakra-ui/react';
import { FiLogIn, FiLogOut } from 'react-icons/fi';

const NavBar: React.FC = () => (
  <Flex direction="row" justify="center" align="center" w="100%" p="5vw" color="black" h="125px">
    <Image src="/kimberley_logo.png" height={110} width={110} alt="boioioing" />
    <Text fontSize="35" m={2}>
      Prom
    </Text>
    <Spacer />
    {Math.random() > 0.5
      ? (
        <>
          <Text fontSize="18" mx={2}>
            Signed In As {}
          </Text>
          <Button onClick={() => {}} leftIcon={<Icon as={FiLogOut} boxSize={6} />}>  Log Out </Button>
        </>
      )
      : (
        <>
          <Text fontSize="18" mx={2}>
            Not Signed In
          </Text>
          <Button onClick={() => {}} leftIcon={<Icon as={FiLogIn} boxSize={6} />}>  Log In </Button>
        </>
      )}
  </Flex>
);

export default NavBar;
