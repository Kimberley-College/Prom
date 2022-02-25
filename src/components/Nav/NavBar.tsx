import {
  Flex, Spacer, Button, Icon, Spinner,
} from '@chakra-ui/react';
import { FiLogIn } from 'react-icons/fi';
import { useUser } from '@supabase/supabase-auth-helpers/react';
import { signin } from 'util/authHelpers';
import Image from 'next/image';
import NextLink from 'next/link';
import SignedInMenu from './SignedInMenu';

const NavBar: React.FC = () => {
  const { user, isLoading } = useUser();

  return (
    <Flex direction="row" justify="center" align="center" w="100%" p="5vw" color="black" h="125px">
      <NextLink href="/"><Image src="/kimberley_logo.png" height={110} width={110} alt="Logo" /></NextLink>
      <Spacer />
      {/* eslint-disable-next-line no-nested-ternary */}
      {isLoading ? <Spinner />
        : user
          ? <SignedInMenu />
          : (
            <Button onClick={signin} leftIcon={<Icon as={FiLogIn} boxSize={6} />}>  Log In </Button>
          )}
    </Flex>
  );
};

export default NavBar;
