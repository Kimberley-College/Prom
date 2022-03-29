import {
  Box, Flex, Spacer, Text, Link,
} from '@chakra-ui/react';
import NextLink from 'next/link';

const Footer: React.FC = () => (
  <Flex direction="row" px="5vw" py={3} alignItems="center" bgGradient="linear(to-b,gray.100,gray.300)">
    <Box w="40vw">
      Developers/Thanks: Nick, Jamie, Dalu, John, Dustin, Roch, Adam, Josh Heng
    </Box>
    <Spacer />
    <Box w="10vw" color="gray.200">
      Axolotl :)
    </Box>
    <Flex justify="right" w="40vw">
      <Text>
        <NextLink href="/terms" passHref><Link>Terms and Conditions</Link></NextLink>  |  <NextLink href="/privacy" passHref><Link>Privacy Policy</Link></NextLink>
      </Text>
    </Flex>
  </Flex>
);

export default Footer;
