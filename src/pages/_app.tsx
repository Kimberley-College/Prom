import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import { ChakraProvider } from '@chakra-ui/react';
import { DefaultSeo } from 'next-seo';
import supabase from '../util/supabaseClient';
import theme from '../util/theme';
import { UserContextProvider } from '../util/useUser';

const App: NextPage<AppProps> = ({ Component, pageProps }) => (
  <UserContextProvider supabaseClient={supabase}>
    <ChakraProvider theme={theme}>
      <DefaultSeo
        title="Kimberley College Prom"
        description="A website for the Kimberley College Prom 2022"
        openGraph={{
          title: 'Kimberley College Prom',
          description: 'A website for the Kimberley College Prom 2022',
          type: 'website',
          locale: 'en_GB',
          url: 'https://prom.kim',
          site_name: 'Kimberley College Prom',
        }}
        additionalLinkTags={[
          {
            rel: 'icon',
            type: 'image/png',
            href: '/favicon.ico',
          },
        ]}
      />
      <Component {...pageProps} />
    </ChakraProvider>
  </UserContextProvider>
);

export default App;
