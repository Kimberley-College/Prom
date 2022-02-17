import type { AppProps } from 'next/app';
import type { NextPage } from 'next';

const App: NextPage<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
);

export default App;
