import {
  Flex, Heading, Button, Box,
  Icon,
  Spinner,
} from '@chakra-ui/react';
import { SiMicrosoftoffice } from 'react-icons/si';
import { BsFillArrowDownCircleFill, BsArrowDownCircle } from 'react-icons/bs';
import { FaRegUser } from 'react-icons/fa';
import { useUser } from '@supabase/supabase-auth-helpers/react';
import { signin } from 'util/authHelpers';
import NextLink from 'next/link';
import ScrollIntoView from 'react-scroll-into-view';

const Header: React.FC = () => {
  const { user, isLoading } = useUser();
  return (
    <>
      <Flex h="600px" pos="relative" direction="column" p="5vw" pt={['150px', null, null, '100px', '350px']} bgImg="/KimberleyBg.png" bgRepeat="no-repeat" bgSize="cover" bgPosition="top" backdropFilter="blur(5px)" backgroundColor="rgba(0,0,0,0.6)" align="flex-start" justify="center" maxH="100vh" gap={10}>
        <Box h="640px" w="100%" pos="absolute" bottom={0} left={0} backdropFilter="blur(5px)" bgColor="rgba(255,255,255,0.2)" zIndex={-1} />
        <Heading color="black" as="h1" size="3xl" fontWeight="bold">Kimberley College Prom</Heading>
        {/* eslint-disable-next-line no-nested-ternary */}
        {isLoading ? <Spinner />
          : user ? (
            <NextLink href="/panel">
              <a><Button leftIcon={<Icon as={FaRegUser} color="white" boxSize={8} />} fontSize="24" p={8}>User Panel</Button></a>
            </NextLink>
          )
            : (
              <Button onClick={signin} leftIcon={<Icon as={SiMicrosoftoffice} color="white" boxSize={8} />} fontSize="24" p={8}>Sign in with Office</Button>
            )}
      </Flex>
      <Flex direction="row" mt="-30px" justify="center" zIndex={105} position="sticky" bottom={2}>
        <BsArrowDownCircle size="60px" color="white" />
      </Flex>
      <Flex alignSelf="center" w="60px" h="60px" borderRadius="30px" shadow="dark-lg" direction="row" mt="-60px" justify="center" zIndex={110} position="sticky" bottom={2} _hover={{ cursor: 'pointer' }}>
        <ScrollIntoView selector="#cards">
          <BsFillArrowDownCircleFill size="60px" color="#711368" />
        </ScrollIntoView>
      </Flex>
    </>
  );
};

export default Header;
