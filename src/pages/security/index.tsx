import type { NextPage } from 'next';
import {
  Button, Heading, Flex,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import BaseLayout from 'components/Layouts/Base';

const Home: NextPage = () => (
  <BaseLayout>
    <Flex direction="column" align="center">
      <Heading as="h1" size="3xl" my={5} textAlign="center">
        Security Panel
      </Heading>
      <Flex gap={3} my={3}>
        <NextLink href="/security/scanner" passHref>
          <Button>Ticket Scanner</Button>
        </NextLink>
      </Flex>

      Welcome to the security area. This should probably have more stuff at some point.

    </Flex>
  </BaseLayout>
);

export default Home;
