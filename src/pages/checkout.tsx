import CheckoutWrapper from 'components/Checkout/CheckoutWrapper';
import BaseLayout from 'components/Layouts/Base';
import { Box, Flex } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { supabaseClient as supabase } from '@supabase/supabase-auth-helpers/nextjs';
import { useUser } from '@supabase/supabase-auth-helpers/react';
import { useEffect, useState } from 'react';

interface Ticket {
  id: number;
  created_at: string;
  email: string;
  checked_in: boolean;
  customer_id: string;
}

const Checkout: NextPage = () => {
  const { user } = useUser();
  const [ticket, setTicket] = useState(null);

  const updateTicket = async (): Promise<void> => supabase.from<Ticket>('tickets').select('*').single().then(({ data }) => setTicket(data));

  useEffect(() => {
    if (!user) return;

    updateTicket();
  }, [user]);

  return (
    <BaseLayout>
      <Flex flexFlow="column nowrap" justify="center" align="center">
        <Box minW="300px" maxW="500px" w="70%">
          <CheckoutWrapper updateTicket={updateTicket} />
        </Box>

        Ticket stuff (move to user panel later):
        {ticket && JSON.stringify(ticket)}

      </Flex>
    </BaseLayout>
  );
};

export default Checkout;
