import { Flex, Heading, Link } from '@chakra-ui/react';

const Banner = () => (
  <Link href="https://www.royal.uk/state-funeral-her-majesty-queen-0" target="_blank" rel="noreferrer noopener">
    <Flex w="100%" bg="linear-gradient(145deg, rgba(230, 230, 250, 0.6) 40%, rgba(0, 0, 255, 0.6) 60%)" p={2} justify="center">
      <Heading as="h3" size="l">RIP HRH Queen Elizabeth II</Heading>
    </Flex>
  </Link>
);

export default Banner;
