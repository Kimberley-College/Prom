import type { NextPage } from 'next';
import {
  Button, Heading, Flex, useToast,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import BaseLayout from 'components/Layouts/Base';
import { useEffect, useState } from 'react';
import type { UserWithTicketInfo } from 'types/user';
import UserCard from 'components/Admin/UserCard';

const Home: NextPage = () => {
  const [users, setUsers] = useState<UserWithTicketInfo[] | null>(null);
  const toast = useToast();

  useEffect(() => {
    const getUsers = async () => {
      const res = await fetch('/api/getAllUsersTicketInfo');
      if (!res.ok) {
        toast({
          status: 'error',
          title: 'Error',
          description: 'Could not get users',
        });
      }
      const data: UserWithTicketInfo[] = await res.json();
      setUsers(data);
    };
    getUsers();
  }, [toast]);

  return (
    <BaseLayout isLoading={!users}>
      <Heading as="h1" size="3xl" my={5} textAlign="center">
        Admin Page
      </Heading>
      <Flex gap={3}>
        <NextLink href="/admin/terminal" passHref>
          <Button>Stripe Terminal</Button>
        </NextLink>
        <NextLink href="/admin/scanner" passHref>
          <Button>Ticket Scanner</Button>
        </NextLink>
      </Flex>

      <Flex gap={3} flexFlow="row wrap">
        {users?.map((user) => (
          <UserCard user={user} />
        ))}
      </Flex>
    </BaseLayout>
  );
};

export default Home;
