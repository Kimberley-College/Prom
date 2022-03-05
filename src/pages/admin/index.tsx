import type { NextPage } from 'next';
import {
  Button, Heading, Flex,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import BaseLayout from 'components/Layouts/Base';

const Home: NextPage = () => (
  <BaseLayout>
    <Heading as="h1" size="3xl" my={5} textAlign="center">
      Admin Page
    </Heading>
    <Flex gap={3}>
      <NextLink href="/admin/terminal">
        <Button>Stripe Terminal</Button>
      </NextLink>
      <NextLink href="/admin/scanner">
        <Button>Ticket Scanner</Button>
      </NextLink>
    </Flex>
  </BaseLayout>
);

export default Home;
