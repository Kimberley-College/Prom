import type { NextPage } from 'next';
import {
  Button, Heading, Flex,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import BaseLayout from 'components/Layouts/Base';
import UsersList from 'components/Admin/UsersList';
import AddUser from 'components/Admin/AddUser';

const Home: NextPage = () => (
  <BaseLayout>
    <Flex direction="column" align="center">
      <Heading as="h1" size="3xl" my={5} textAlign="center">
        Admin Panel
      </Heading>
      <Flex gap={3} my={3}>
        <NextLink href="/admin/terminal" passHref>
          <Button>Stripe Terminal</Button>
        </NextLink>
        <NextLink href="/admin/scanner" passHref>
          <Button>Ticket Scanner</Button>
        </NextLink>
        <AddUser />
      </Flex>

      <UsersList />

    </Flex>
  </BaseLayout>
);

export default Home;
