import type { NextPage } from 'next';
import {
  Heading, Text,
} from '@chakra-ui/react';
import BaseLayout from 'components/Layouts/Base';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useUser } from '@supabase/supabase-auth-helpers/react';
import Error from 'next/error';

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
  const [errorCode, setErrorCode] = useState<false | number>(false);
  const { user } = useUser();

  useEffect(() => {
    if (!router || !user) return;
    const getUser = async (): Promise<void> => {
      const res = await fetch(`/api/getUser/${router.query.id}`);
      if (!res.ok) {
        setErrorCode(res.status);
        return;
      }
      const { data }: { data?: ManagedUser } = await res.json();
      setManagedUser(data);
    };
    getUser();
    setIsLoading(false);
  }, [router, user]);

  if (errorCode) return <Error statusCode={errorCode} />;

  return (
    <BaseLayout isLoading={isLoading}>
      <Heading as="h1" size="3xl">
        {/* Managing {managedUser?.name} */}
        Managing {user?.user_metadata.proper_name}
      </Heading>
      <Text>Has bought ticket: {managedUser?.hasTicket}</Text>
      <Text>Has checked in: {managedUser?.checkedIn}</Text>
    </BaseLayout>
  );
};

export default ManageSpecificUser;
