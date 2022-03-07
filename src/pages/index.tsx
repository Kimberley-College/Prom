import type { NextPage } from 'next';
import Header from 'components/Home/Header';
import Cards from 'components/Home/Cards';
import HomeLayout from 'components/Layouts/Home';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';

const Home: NextPage = () => {
  const router = useRouter(); // from next/router
  const toast = useToast();
  useEffect(() => {
    const { query } = router;
    if (query.error) {
      toast({
        status: 'error',
        title: query.error,
        description: query.error_message, // or whatever it is''
      });
    }
    // stuff here will run when the page loads
    // parse your query params in here
  }, [router, toast]); // dependency array = re-run when any of these change

  // in this you might need a dependency array of [router] because you're using it inside the effect hook and effectively have to wait for it to load
  return (
    <HomeLayout>
      <Header />

      <Cards />
    </HomeLayout>
  );
};
export default Home;
