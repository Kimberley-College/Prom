import { Flex } from '@chakra-ui/react';
import MoreInfo from './MoreInfo';

const HasTicket: React.FC = () => (
  <>
    <Flex h="500px" align="center" justify="center">
      Your ticket goes here.
    </Flex>
    <MoreInfo />
  </>
);

export default HasTicket;
