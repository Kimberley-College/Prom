import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import { ChakraProvider } from '@chakra-ui/react';
import supabase from '../util/supabaseClient';
import theme from '../util/theme';
import { UserContextProvider } from '../util/useUser';
import BaseLayout from '../components/Layouts/Base';

const App: NextPage<AppProps> = ({ Component, pageProps }) => (
  <UserContextProvider supabaseClient={supabase}>
    <ChakraProvider theme={theme}>
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </ChakraProvider>
  </UserContextProvider>
);

export default App;
