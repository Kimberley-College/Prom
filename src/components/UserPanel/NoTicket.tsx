import {
  Flex, Heading, Text,
} from '@chakra-ui/react';
import CheckoutWrapper from 'components/Checkout/CheckoutWrapper';
import MoreInfo from './MoreInfo';

const NoTicket: React.FC = () => (
  <Flex w="100%" justify="center" align="center" direction="column" p={5}>
    <Heading as="h2" mb={3}><Text textAlign="center">Buy your ticket for £{(parseInt(process.env.NEXT_PUBLIC_TICKET_PRICE, 10) / 100).toFixed(2)}</Text></Heading>
    <Flex flexFlow="column nowrap" justify="center" align="center" alignSelf="center" minW="300px" maxW="500px" w="70%">
      <CheckoutWrapper />
    </Flex>
    <Flex height="50px" />
    <Heading as="h2" textAlign="center">More information</Heading>
    <MoreInfo />

  </Flex>
);

export default NoTicket;
