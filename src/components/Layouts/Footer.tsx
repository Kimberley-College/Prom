import {
  Box, Flex, Spacer, Text, Link,
} from '@chakra-ui/react';

const Footer: React.FC = () => (
  <Flex borderTopStyle="dashed" borderTopWidth="1px" direction="row" px="5vw" py={3} alignItems="center" bgGradient="linear(to-b,gray.100,gray.300)">
    <Box w="40vw">
      Special Thanks: Inferno Communications, Josh Heng, Nick, Jacques, Jean (Lead Developer), Dustin, Raffi 
    </Box>
    <Spacer />
    <Flex justify="right" w="40vw">
      <Text>
        <Link>Terms and Conditions</Link>  |  <Link>Privacy Policy</Link>
      </Text>
    </Flex>
  </Flex>
);

export default Footer;
