import {
  useEffect, useState, createContext, useContext, useMemo,
} from 'react';
import type { SupabaseClient, Session, User } from '@supabase/supabase-js';

export interface AuthSession {
  user: User | null
  session: Session | null
}

const UserContext = createContext<AuthSession>({ user: null, session: null });

export interface Props {
  supabaseClient: SupabaseClient
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propName: string]: any
}

export const UserContextProvider = (props: Props): JSX.Element => {
  const { supabaseClient } = props;
  const [session, setSession] = useState<Session | null>(
    supabaseClient.auth.session(),
  );
  const [user, setUser] = useState<User | null>(session?.user ?? null);

  useEffect(() => {
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);
      },
    );

    return () => {
      authListener?.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(() => ({
    session,
    user,
  }), [session, user]);

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = (): AuthSession => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserContextProvider.');
  }
  return context;
};
