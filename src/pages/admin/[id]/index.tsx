import type { NextPage } from 'next';
import {
  Flex,
  Heading, Text,
} from '@chakra-ui/react';
import BaseLayout from 'components/Layouts/Base';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useUser } from '@supabase/supabase-auth-helpers/react';
import Error from 'next/error';
import type { UserWithTicket } from 'types/user';
import QR from 'components/UserPanel/QR';

const ManageSpecificUser: NextPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [managedUser, setManagedUser] = useState<null | UserWithTicket>(null);
  const [errorCode, setErrorCode] = useState<false | number>(false);
  const { user } = useUser();

  useEffect(() => {
    if (!router?.query?.id || !user) return;

    const getUser = async (): Promise<void> => {
      const res = await fetch(`/api/getUser/${router.query.id}`);
      if (!res.ok) {
        setErrorCode(res.status);
        return;
      }
      const data: UserWithTicket = await res.json();
      setManagedUser(data);
      setIsLoading(false);
    };
    getUser();
  }, [router, user]);

  if (errorCode) return <Error statusCode={errorCode} />;

  return (
    <BaseLayout isLoading={isLoading}>
      <Flex direction="column" align="center">
        <Heading as="h1" size="3xl" lineHeight={1.2} my={3}>Managing {managedUser?.name}</Heading>
        <Text>Is admin: {managedUser?.is_admin ? 'Yes' : 'No'}</Text>
        <Text>Has bought ticket: {managedUser?.has_ticket ? 'Yes' : 'No'}</Text>

        {managedUser?.has_ticket && (
        <>
          <Text>Has checked in: {managedUser?.checked_in ? 'Yes' : 'No'}</Text>
          <Heading as="h3" py={2}>Their Ticket</Heading>
          <QR jwt={managedUser?.jwt} />
        </>
        )}
      </Flex>
    </BaseLayout>
  );
};

export default ManageSpecificUser;
