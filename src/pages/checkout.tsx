import CheckoutWrapper from 'components/Checkout/CheckoutWrapper';
import BaseLayout from 'components/Layouts/Base';
import { Box, Flex } from '@chakra-ui/react';
import type { NextPage } from 'next';

const Checkout: NextPage = () => (
  <BaseLayout>
    <Flex flexFlow="column nowrap" justify="center" align="center">
      <Box minW="300px" maxW="500px" w="70%">
        <CheckoutWrapper />
      </Box>

    </Flex>
  </BaseLayout>
);

export default Checkout;
