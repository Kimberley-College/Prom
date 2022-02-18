import {
  Flex, Image, Text, Spacer, Button,
} from '@chakra-ui/react';

const NavBar: React.FC = () => (
  <Flex w="100%" p={4} color="black" alignItems="center" h="125px">
    <Image src="/kimberley_logo.png" height={110} width={110} alt="boioioing" />
    <Text fontSize="35">
      Prom
    </Text>
    <Spacer />
    {Math.random() > 0.5
      ? (
        <>
          <Text fontSize="18" mx={2}>
            Signed In As {}
          </Text>
          <Button onClick={() => {}}>Log out</Button>
        </>
      )
      : (
        <>
          <Text fontSize="18" mx={2}>
            Not Signed In
          </Text>
          <Button onClick={() => {}}>Log In</Button>
        </>
      )}
  </Flex>
);

export default NavBar;
