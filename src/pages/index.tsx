import type { NextPage } from 'next';
import {
  Box, Button, Text, useToast,
} from '@chakra-ui/react';
import Image from 'next/image';
import supabase from '../util/supabaseClient';
import { useUser } from '../util/useUser';

const Home: NextPage = () => {
  const toast = useToast();
  const { user, session } = useUser();

  const signin = async (): Promise<void> => {
    const { error } = await supabase.auth.signIn({
      provider: 'azure',
    }, {
      scopes: 'email',
    });

    if (error) {
      toast({
        variant: 'error',
        title: error?.message ?? 'Sign in failed',
      });
    }
  };

  const signout = async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        variant: 'error',
        title: error?.message ?? 'Sign out failed',
      });
    }
  };

  return (
    <>
      <Box bg="#1A365D" w="100%" p={4} color="white" display="flex" alignItems="center">
        <Image src="/kimberley_logo.png" height={110} width={110} alt="boioioing" />
        <Text fontSize="35">
          Kimberley College Prom 2022
        </Text>
        {user
          ? (
            <>
              <Text fontSize="35" mx={2}>
                Signed In As {user?.user_metadata.full_name}
              </Text>
              <Button onClick={signout}>Log out</Button>
            </>
          )
          : (
            <>
              <Text fontSize="35" mx={2}>
                Not Signed In
              </Text>
              <Button onClick={signin}>Log In</Button>
            </>
          )}
      </Box>
      {JSON.stringify(user)}
      {JSON.stringify(session)}
    </>
  );
};

export default Home;
