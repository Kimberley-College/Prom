import { Flex } from '@chakra-ui/react';
import MoreInfo from './moreInfo';

const HasTicket: React.FC = () => (
  <>
    <Flex borderWidth="2px" h="500px" align="center" justify="center">
      Your ticket goes here.
    </Flex>
    <MoreInfo />
  </>
);

export default HasTicket;
