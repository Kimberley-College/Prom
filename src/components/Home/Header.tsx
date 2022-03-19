import {
  Flex, Heading, Button, Box,
  Icon,
  Spinner,
} from '@chakra-ui/react';
import { SiMicrosoftoffice } from 'react-icons/si';
import { FaRegUser } from 'react-icons/fa';
import { BsFillArrowDownCircleFill, BsArrowDownCircle } from 'react-icons/bs';
import { useUser } from '@supabase/supabase-auth-helpers/react';
import { signin } from 'util/authHelpers';
import NextLink from 'next/link';
import { animateScroll as scroll } from 'react-scroll';

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
            <NextLink href="/panel" passHref><Button leftIcon={<Icon as={FaRegUser} color="black" boxSize={8} />} fontSize="24" p={8}>User Panel</Button></NextLink>
          )
            : (
              <Button onClick={signin} leftIcon={<Icon as={SiMicrosoftoffice} color="black" boxSize={8} />} fontSize="24" p={8}>Sign in with Office</Button>
            )}
      </Flex>
      <Flex direction="row" mt="-30px" justify="center" zIndex={5}>
        <BsArrowDownCircle size="60px" color="white" />
      </Flex>
      <Flex direction="row" mt="-60px" justify="center" zIndex={6} onClick={() => scroll.scrollTo('cards')}>
        <BsFillArrowDownCircleFill size="60px" color="#711368" />
      </Flex>
    </>
  );
};

export default Header;
