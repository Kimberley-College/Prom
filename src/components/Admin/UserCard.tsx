import { Box } from '@chakra-ui/react';
import type { UserWithTicketInfo } from 'types/user';

interface Props {
  user: UserWithTicketInfo;
}

const UserCard: React.FC<Props> = ({ user }) => (
  <Box w="300px" h="300px" bgColor="purple.300">
    {JSON.stringify(user)}
  </Box>
);

export default UserCard;
