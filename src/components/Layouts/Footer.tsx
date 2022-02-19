import {
  Box, Flex, Spacer, Text, Link,
} from '@chakra-ui/react';
import NextLink from 'next/link';

const Footer: React.FC = () => (
  <Flex borderTopStyle="dashed" borderTopWidth="1px" direction="row" px="5vw" py={3} alignItems="center" bgGradient="linear(to-b,gray.100,gray.300)">
    <Box w="40vw">
      Special Thanks: Inferno Communications, Josh Heng, Nick, Jacques, Jean, Dustin, Raffi
    </Box>
    <Spacer />
    <Flex justify="right" w="40vw">
      <Text>
        <NextLink href="/terms"><Link>Terms and Conditions</Link></NextLink>  |  <NextLink href="/privacy"><Link>Privacy Policy</Link></NextLink>
      </Text>
    </Flex>
  </Flex>
);

export default Footer;
