import { Flex, Heading, Text } from '@chakra-ui/react';
import type { UserWithTicketInfo } from 'types/user';

interface Props {
  user: UserWithTicketInfo;
}

const UserCard: React.FC<Props> = ({ user }) => (
  <Flex h="100%" w="310px" p={3} bgColor={user.checked_in ? 'green.400' : user.has_ticket ? 'blue.300' : 'purple.300'} borderRadius={10} direction="column">
    <Heading as="h3" size="lg" textAlign="center" pb={2}>{user.name}</Heading>
    <Text>Email: {user.email}</Text>
    <Text>Has Ticket: {user.has_ticket ? 'Yes' : 'No'}</Text>
    <Text>Checked In: {user.checked_in ? 'Yes' : 'No'}</Text>
  </Flex>
);

export default UserCard;
