import type { NextPage } from 'next';
import {
  Button, Heading,
} from '@chakra-ui/react';
import BaseLayout from 'components/Layouts/Base';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useUser } from '@supabase/supabase-auth-helpers/react';

interface ManagedUser {
  id: string;
  email: string;
  name: string;
  is_admin: boolean;
  hasTicket: boolean;
  checkedIn: boolean;
}

const Home: NextPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [managedUser, setManagedUser] = useState(null);

  useEffect(() => {
    if (!router) return;
    const getUser = async (): Promise<void> => {
      const { data } = await fetch(`/api/getUser/${router.query.id}`).then((res) => res.json());
      setManagedUser(data);
    };
    getUser();
    setIsLoading(false);
  }, [router]);

  // Just want to try getting Stripe Terminal working, the getting another user stuff needs a lot more work.

  const { user } = useUser();

  return (
    <BaseLayout isLoading={isLoading}>
      <Heading as="h1" size="3xl">
        {/* Managing {managedUser?.name} */}
        Managing {user.user_metadata.proper_name}
      </Heading>
      <Button>Launch Terminal</Button>
    </BaseLayout>
  );
};

export default Home;
