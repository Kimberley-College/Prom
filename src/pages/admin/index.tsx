import type { NextPage } from 'next';
import {
  Button, Heading,
} from '@chakra-ui/react';
import Link from 'next/link';
import BaseLayout from 'components/Layouts/Base';

const Home: NextPage = () => (
  <BaseLayout>
    <Heading as="h1" size="3xl">
      Admin Page
    </Heading>
    <Link href="/ticketScanner">
      <Button>Ticket Scanner</Button>
    </Link>
  </BaseLayout>
);

export default Home;
