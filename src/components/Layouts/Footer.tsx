import {
  Box, Flex, Spacer, Text, Link,
} from '@chakra-ui/react';

const Footer: React.FC = () => (
  <Flex borderTopStyle="dashed" borderTopWidth="1px" direction="row" px="5vw" py={3} alignItems="center">
    <Box w="40vw">
      Special Thanks: Inferno Communications, Josh Heng, Nick, Jacques, Jean, Dustin
    </Box>
    <Spacer />
    <Text>
      <Link>Terms and Conditions</Link> |  <Link>Privacy Policy</Link>
    </Text>
  </Flex>
);

export default Footer;
