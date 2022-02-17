import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import theme from '../util/theme';

const App: NextPage<AppProps> = ({ Component, pageProps }) => (
  <SessionProvider>
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  </SessionProvider>
);

export default App;
