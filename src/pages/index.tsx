import type { NextPage } from 'next';
import Header from 'components/Home/Header';
import Cards from 'components/Home/Cards';
import HomeLayout from 'components/Layouts/Home';

const Home: NextPage = () => (
  <HomeLayout>
    <Header />

    <Cards />
  </HomeLayout>
);

export default Home;
