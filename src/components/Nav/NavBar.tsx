import {
  Flex, Image, Text, Spacer, Button, Icon,
} from '@chakra-ui/react';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { useUser } from '@supabase/supabase-auth-helpers/react';
import { signin, signout } from 'util/authHelpers';

const NavBar: React.FC = () => {
  const { user } = useUser();
  const fullName = user?.user_metadata.proper_name;
  return (
    <Flex direction="row" justify="center" align="center" w="100%" p="5vw" color="black" h="125px">
      <Image src="/kimberley_logo.png" height={110} width={110} alt="boioioing" />
      <Text fontSize="35" m={2}>
        Prom
      </Text>
      <Spacer />
      {user
        ? (
          <>
            <Text fontSize="18" mx={2}>
              Signed in as {fullName}
            </Text>
            <Button onClick={signout} leftIcon={<Icon as={FiLogOut} boxSize={6} />}>  Log Out </Button>
          </>
        )
        : (
          <>
            <Text fontSize="18" mx={2}>
              Not Signed In
            </Text>
            <Button onClick={signin} leftIcon={<Icon as={FiLogIn} boxSize={6} />}>  Log In </Button>
          </>
        )}
    </Flex>
  );
};

export default NavBar;
