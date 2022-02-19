import { createStandaloneToast } from '@chakra-ui/react';
import supabase from './supabaseClient';

export const signin = async (): Promise<void> => {
  const toast = createStandaloneToast();
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

export const signout = async (): Promise<void> => {
  const toast = createStandaloneToast();
  const { error } = await supabase.auth.signOut();
  if (error) {
    toast({
      variant: 'error',
      title: error?.message ?? 'Sign out failed',
    });
  }
};
