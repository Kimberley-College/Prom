import type { NextPage } from 'next';
import Header from 'components/Home/Header';
import Cards from 'components/Home/Cards';

const Home: NextPage = () => (
  <>
    <Header />

    <Cards />
  </>
);

export default Home;
