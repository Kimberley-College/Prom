import {
  Flex, Heading, Text,
} from '@chakra-ui/react';
import CheckoutWrapper from 'components/Checkout/CheckoutWrapper';
import type { Flags } from 'types/flags';
import { useFlags } from '@happykit/flags/client';
import { useUser } from '@supabase/auth-helpers-react';
import MoreInfo from './MoreInfo';

const NoTicket: React.FC = () => {
  const { user } = useUser();
  const { flags } = useFlags<Flags>({
    user: {
      key: user.id,
      email: user.email,
      name: user.user_metadata.proper_name,
    },
  });
  const purchasesEnabled = flags?.purchases_enabled;
  return (
    <Flex w="100%" justify="center" align="center" direction="column" p={5}>
      <Heading as="h2" mb={3}><Text textAlign="center">Buy your ticket for £{(parseInt(process.env.NEXT_PUBLIC_TICKET_PRICE, 10) / 100).toFixed(2)}</Text></Heading>
      <Flex flexFlow="column nowrap" justify="center" align="center" alignSelf="center" minW="300px" maxW="500px" w="70%">
        <CheckoutWrapper purchasesEnabled={purchasesEnabled} />
      </Flex>
      <Flex height="50px" />
      <Heading as="h2" textAlign="center">More information</Heading>
      <MoreInfo />

    </Flex>
  );
};

export default NoTicket;
