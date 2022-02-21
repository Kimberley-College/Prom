import { createStandaloneToast } from '@chakra-ui/react';
import { supabaseClient as supabase } from '@supabase/supabase-auth-helpers/nextjs';

export const signin = async (): Promise<void> => {
  const toast = createStandaloneToast();
  const { error, user } = await supabase.auth.signIn({
    provider: 'azure',
  }, {
    scopes: 'email',
  });

  if (error) {
    toast({
      status: 'error',
      title: error?.message ?? 'Sign in failed',
    });
  } else if (user) {
    toast({
      status: 'success',
      title: 'Sign in successful',
    });
  }
};

export const signout = async (): Promise<void> => {
  const toast = createStandaloneToast();
  const { error } = await supabase.auth.signOut();
  if (error) {
    toast({
      status: 'error',
      title: error?.message ?? 'Sign out failed',
    });
  } else {
    toast({
      status: 'success',
      title: 'Sign out successful',
    });
  }
};
