import { Flex, Heading, Link } from '@chakra-ui/react';

const Banner = () => (
  <Link href="https://www.gov.uk/government/news/ukraine-what-you-can-do-to-help" target="_blank" rel="noreferrer noopener">
    <Flex w="100%" bg="linear-gradient(145deg, rgba(0, 87, 183, 0.6) 40%, rgba(255, 215, 0, 0.6) 60%)" p={2} justify="center">
      <Heading as="h3" size="l">Slava Ukraini! | Glory to Ukraine</Heading>
    </Flex>
  </Link>
);

export default Banner;
