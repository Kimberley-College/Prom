import type { NextPage } from 'next';
import Header from 'components/Home/Header';
import Cards from 'components/Home/Cards';
import HomeLayout from 'components/Layouts/Home';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';

const Home: NextPage = () => {
  const router = useRouter();
  const toast = useToast();
  useEffect(() => {
    const { query } = router;
    if (query.error) {
      toast({
        status: 'error',
        title: query.error,
        description: query.error_description,
      });
    }
  }, [router, toast]);
  return (
    <HomeLayout>
      <Header />

      <Cards />
    </HomeLayout>
  );
};
export default Home;
