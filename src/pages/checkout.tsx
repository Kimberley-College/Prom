import CheckoutWrapper from 'components/Checkout/CheckoutWrapper';
import BaseLayout from 'components/Layouts/Base';
import { Box, Flex } from '@chakra-ui/react';

const Checkout = () => (
  <BaseLayout>
    <Flex flexFlow="column nowrap" justify="center" align="center">
      <Box w="500px">
        <CheckoutWrapper />
      </Box>

    </Flex>
  </BaseLayout>
);

export default Checkout;
