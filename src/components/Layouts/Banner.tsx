import { Flex, Heading } from '@chakra-ui/react';

const Banner = () => (
  <Flex w="100%" bg="linear-gradient(145deg, rgba(0, 87, 183, 0.6) 40%, rgba(255, 215, 0, 0.6) 60%)" p={2} justify="center">
    <Heading as="h3" size="l">Slava Ukraini! | Glory to Ukraine</Heading>
  </Flex>
);

export default Banner;
