import type { NextPage } from 'next';
import {
  Button,
  Flex,
  Heading,
  Text,
  useToast,
} from '@chakra-ui/react';
import BaseLayout from 'components/Layouts/Base';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import Error from 'next/error';
import type { UserWithTicket, Ticket } from 'types/user';
import QR from 'components/UserPanel/QR';
import { supabaseClient as supabase } from '@supabase/auth-helpers-nextjs';
import RiskLevel from 'components/Admin/RiskLevel';

const ManageSpecificUser: NextPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [managedUser, setManagedUser] = useState<null | UserWithTicket>(null);
  const [errorCode, setErrorCode] = useState<false | number>(false);
  const { user } = useUser();
  const toast = useToast();

  const getUser = useCallback(async (): Promise<void> => {
    const res = await fetch(`/api/getUser/${router.query.id}`);
    if (!res.ok) {
      setErrorCode(res.status);
      return;
    }
    const data: UserWithTicket = await res.json();
    setManagedUser(data);
    setIsLoading(false);
  }, [router]);

  useEffect(() => {
    if (!router?.query?.id || !user) return;

    getUser();
  }, [router, user, getUser]);

  const toggleAdmin = async () => {
    const res = await fetch(`/api/user/${router?.query?.id}/toggleAdmin`);
    if (!res.ok) {
      toast({
        title: 'Failed to toggle admin',
        status: 'error',
      });
      return;
    }
    const data = await res.json();
    toast({
      title: 'Admin status toggled',
      description: `New admin status: ${data.is_admin}`,
      status: 'success',
    });
    getUser();
  };

  const unCheckIn = async () => {
    const { error, data: newTicket } = await supabase.from<Ticket>('tickets').update({ checked_in: false }).match({ id: managedUser.ticketId }).single();
    if (error) {
      toast({
        title: 'Failed to uncheck in',
        status: 'error',
      });
      return;
    }
    toast({
      title: 'Unchecked in',
      description: `New check in status: ${newTicket.checked_in}`,
      status: 'success',
    });
    getUser();
  };

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
          <RiskLevel user={managedUser} />
          {/* <Notes user={managedUser} /> */}
        </>
        )}

        {managedUser?.checked_in && (
          <Button mt={3} onClick={unCheckIn}>Un Check-in</Button>
        )}

        <Button mt={3} onClick={toggleAdmin}>Toggle Admin</Button>
      </Flex>
    </BaseLayout>
  );
};

export default ManageSpecificUser;
