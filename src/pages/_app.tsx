import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import { ChakraProvider } from '@chakra-ui/react';
import supabase from '../util/supabaseClient';
import theme from '../util/theme';
import { UserContextProvider } from '../util/useUser';

const App: NextPage<AppProps> = ({ Component, pageProps }) => (
  <UserContextProvider supabaseClient={supabase}>
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  </UserContextProvider>
);

export default App;
