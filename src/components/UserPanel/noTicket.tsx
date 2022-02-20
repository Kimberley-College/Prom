import { Flex } from '@chakra-ui/react';
import MoreInfo from './moreInfo';

const NoTicket: React.FC = () => (
  <>
    <Flex borderWidth="2px" h="500px" align="center" justify="center">
      Buying ticket goes here.
    </Flex>
    <MoreInfo />
  </>
);

export default NoTicket;
