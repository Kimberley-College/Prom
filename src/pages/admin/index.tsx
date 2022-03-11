import type { NextPage } from 'next';
import {
  Button, Heading, Flex, useToast, Input,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import BaseLayout from 'components/Layouts/Base';
import { useEffect, useState } from 'react';
import type { UserWithTicketInfo } from 'types/user';
import UserCard from 'components/Admin/UserCard';

const Home: NextPage = () => {
  const [users, setUsers] = useState<UserWithTicketInfo[] | null>(null);
  const toast = useToast();
  const [search, setSearch] = useState('');

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
      <Flex direction="column" align="center">
        <Heading as="h1" size="3xl" my={5} textAlign="center">
          Admin Page
        </Heading>
        <Flex gap={3} my={3}>
          <NextLink href="/admin/terminal" passHref>
            <Button>Stripe Terminal</Button>
          </NextLink>
          <NextLink href="/admin/scanner" passHref>
            <Button>Ticket Scanner</Button>
          </NextLink>
        </Flex>

        <Input borderColor="gray.500" focusBorderColor="gray.600" _hover={{ borderColor: 'gray.600' }} minW="300px" maxW="500px" w="80%" my={3} placeholder="Search by name" value={search} onChange={(e) => setSearch(e.currentTarget.value)} />

        <Flex gap={3} flexFlow="row wrap" justify="center">
          {users?.filter((user) => user.name.toLowerCase().includes(search.toLowerCase())).map((user) => (
            <UserCard user={user} />
          ))}
        </Flex>
      </Flex>
    </BaseLayout>
  );
};

export default Home;
