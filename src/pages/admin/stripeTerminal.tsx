import type { NextPage } from 'next';
import { Box, Button, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

const Home: NextPage = () => {
  const { data: session } = useSession();
  return (
    <Box bg="#1A365D" w="100%" p={4} color="white" display="flex" alignItems="center">
      <Image src="/kimberley_logo.png" height={110} width={110} alt="boioioing" />
      <Text fontSize="35">
        Kimberley College Prom 2022 Admin Page
      </Text>
      <>
        <Text fontSize="35" mx={2}>
          Signed Into Admin As {session.user.name}
        </Text>
        <Button onClick={() => signOut()}>Log out</Button>
      </>
      <>
        <Link href="/userManagement">
          <Button>User Management</Button>
        </Link>
        <Link href="/ticketScanner">
          <Button>TicketScanner</Button>
        </Link>
        <Link href="/stripeTerminal">
          <Button>Stripe Terminal</Button>
        </Link>
      </>
    </Box>
  );
};

export default Home;
