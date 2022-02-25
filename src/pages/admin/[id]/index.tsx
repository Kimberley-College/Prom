import type { NextPage } from 'next';
import {
  Button, Heading,
} from '@chakra-ui/react';
import BaseLayout from 'components/Layouts/Base';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useUser } from '@supabase/supabase-auth-helpers/react';
import NextLink from 'next/link';

interface ManagedUser {
  id: string;
  email: string;
  name: string;
  is_admin: boolean;
  hasTicket: boolean;
  checkedIn: boolean;
}

const ManageSpecificUser: NextPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [managedUser, setManagedUser] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    if (!router || !user) return;
    const getUser = async (): Promise<void> => {
      const { data }: { data: ManagedUser } = await fetch(`/api/getUser/${router.query.id}`).then((res) => res.json());
      setManagedUser(data);
    };
    getUser();
    setIsLoading(false);
    console.log(managedUser);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  // Just want to try getting Stripe Terminal working, the getting another user stuff needs a lot more work.

  return (
    <BaseLayout isLoading={isLoading}>
      <Heading as="h1" size="3xl">
        {/* Managing {managedUser?.name} */}
        Managing {user?.user_metadata.proper_name}
      </Heading>
      <NextLink href={`/admin/${router.query.id}/terminal`}><Button>Launch Terminal</Button></NextLink>
    </BaseLayout>
  );
};

export default ManageSpecificUser;
