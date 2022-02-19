import { createStandaloneToast } from '@chakra-ui/react';
import supabase from './supabaseClient';

export const signin = async (): Promise<void> => {
  const toast = createStandaloneToast();
  const { error, user } = await supabase.auth.signIn({
    provider: 'azure',
  }, {
    scopes: 'email',
  });

  if (error) {
    toast({
      variant: 'error',
      title: error?.message ?? 'Sign in failed',
    });
  } else if (user) {
    toast({
      variant: 'success',
      title: 'Sign in successful',
    });
  }
};

export const signout = async (): Promise<void> => {
  const toast = createStandaloneToast();
  const { error } = await supabase.auth.signOut();
  if (error) {
    toast({
      variant: 'error',
      title: error?.message ?? 'Sign out failed',
    });
  } else {
    toast({
      variant: 'success',
      title: 'Sign out successful',
    });
  }
};
