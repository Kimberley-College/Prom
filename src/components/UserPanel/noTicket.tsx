import { Flex, Heading } from '@chakra-ui/react';
import CheckoutWrapper from 'components/Checkout/CheckoutWrapper';
import MoreInfo from './MoreInfo';

const NoTicket: React.FC = () => (
  <Flex w="100%" justify="center" direction="column" p={5}>
    <Heading as="h1" textAlign="center" size="3xl" m={5}>User Panel</Heading>

    <Heading as="h2">More information</Heading>
    <MoreInfo />

    <Heading as="h2" mb={3}>Buy your ticket</Heading>
    <Flex flexFlow="column nowrap" justify="center" align="center" alignSelf="center" minW="300px" maxW="500px" w="70%">
      <Heading as="h4" mb={3}>Paying £30</Heading>
      <CheckoutWrapper />
    </Flex>
  </Flex>
);

export default NoTicket;
