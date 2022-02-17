import type { NextPage } from 'next';
import { Box, Text } from '@chakra-ui/react';
import Image from 'next/image';

const Home: NextPage = () => (
  <Box bg="#1A365D" w="100%" p={4} color="white" display="flex" alignItems="center">
    <Image src="/kimberley_logo.png" height={110} width={110} alt="boioioing" />
    <Text fontSize="35">
      Kimberley College Prom 2022
    </Text>
  </Box>
);

export default Home;
