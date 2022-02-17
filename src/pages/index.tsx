import type { NextPage } from 'next';
import { Box, Button, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';

const Home: NextPage = () => {
  const { data: session } = useSession();
  return (
    <Box bg="#1A365D" w="100%" p={4} color="white" display="flex" alignItems="center">
      <Image src="/kimberley_logo.png" height={110} width={110} alt="boioioing" />
      <Text fontSize="35">
        Kimberley College Prom 2022
      </Text>
      {session
        ? (
          <>
            <Text fontSize="35" mx={2}>
              Signed In As {session.user.name}
            </Text>
            <Button onClick={() => signOut()}>Log out</Button>
          </>
        )
        : (
          <>
            <Text fontSize="35" mx={2}>
              Not Signed In
            </Text>
            <Button onClick={() => signIn('azure-ad')}>Log In</Button>
          </>
        )}
    </Box>
  );
};

export default Home;
