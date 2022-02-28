import type { NextPage } from 'next';
import {
  Heading,
} from '@chakra-ui/react';
import BaseLayout from 'components/Layouts/Base';
import { useEffect, useState } from 'react';
import TerminalStuff from 'components/Terminal/TerminalStuff';
import UserSelect from 'components/Terminal/UserSelect';

const TerminalPage: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => setLoading(false), []);
  const [userId, setUserId] = useState<string>('');

  return (
    <BaseLayout isLoading={loading}>
      <Heading as="h1" size="3xl" my={5}>Stripe Terminal</Heading>
      <UserSelect setUserId={setUserId} userId={userId} />
      <TerminalStuff setUserId={setUserId} userId={userId} />
    </BaseLayout>
  );
};
export default TerminalPage;
