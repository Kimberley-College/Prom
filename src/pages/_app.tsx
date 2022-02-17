import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import { ChakraProvider } from '@chakra-ui/react';

const App: NextPage<AppProps> = ({ Component, pageProps }) => (
  <ChakraProvider>
    <Component {...pageProps} />
  </ChakraProvider>
);

export default App;
