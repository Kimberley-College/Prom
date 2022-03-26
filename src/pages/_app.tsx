import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import { ChakraProvider } from '@chakra-ui/react';
import { DefaultSeo } from 'next-seo';
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs';
import { UserProvider } from '@supabase/supabase-auth-helpers/react';
import { useAnalytics } from '@happykit/analytics';
import { TicketContextProvider } from 'util/ticketContext';
import theme from '../util/theme';

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  useAnalytics({ publicKey: process.env.NEXT_PUBLIC_HAPPYKIT_ANALYTICS_PUBLIC_KEY });

  return (
    <UserProvider supabaseClient={supabaseClient}>
      <TicketContextProvider>
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
              images: [
                {
                  url: 'https://prom.kim/kimberley_logo.png',
                  type: 'image/png',
                  width: 400,
                  height: 400,
                },
              ],
            }}
            additionalLinkTags={[
              {
                rel: 'shortcut icon',
                type: 'image/png',
                href: '/favicon.ico',
              },
              {
                rel: 'manifest',
                href: '/manifest.json',
              },
              {
                rel: 'apple-touch-icon',
                sizes: '180x180',
                href: '/icons/apple-touch-icon.png',
              },
            ]}
            additionalMetaTags={[
              {
                name: 'application-name',
                content: 'Kimberley College Prom',
              },
              {
                name: 'apple-mobile-web-app-title',
                content: 'Kiberley College Prom',
              },
              {
                name: 'apple-mobile-web-app-capable',
                content: 'yes',
              },
              {
                name: 'apple-mobile-web-app-status-bar-style',
                content: 'default',
              },
              {
                name: 'mobile-web-app-capable',
                content: 'yes',
              },
            ]}
          />
          <Component {...pageProps} />
        </ChakraProvider>
      </TicketContextProvider>
    </UserProvider>
  );
};

export default App;
