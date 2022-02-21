import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import { ChakraProvider } from '@chakra-ui/react';
import { DefaultSeo } from 'next-seo';
import { supabaseClient, SupabaseClient } from '@supabase/supabase-auth-helpers/nextjs';
import { UserProvider } from '@supabase/supabase-auth-helpers/react';
import theme from '../util/theme';

interface Tickets {
  id: number;
  created_at: string;
  email: string;
  checked_in: boolean;
  customer_id: string;
}

const loadTicket = async (supabase: SupabaseClient): Promise<Tickets> => (await supabase.from<Tickets>('tickets').select('*').single()).data;

const App: NextPage<AppProps> = ({ Component, pageProps }) => (
  <UserProvider supabaseClient={supabaseClient} onUserLoaded={async (supabase) => loadTicket(supabase)}>
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
  </UserProvider>
);

export default App;
