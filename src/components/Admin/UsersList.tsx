import {
  useToast, Flex, Input, Select, Text, Spinner,
} from '@chakra-ui/react';
import { useState, useEffect, useMemo } from 'react';
import { UserWithTicketInfo } from 'types/user';
import NextLink from 'next/link';
import UserCard from './UserCard';

type SelectTypes = '' | 'has_ticket' | 'checked_in' | 'no';

const UsersList = () => {
  const [users, setUsers] = useState<UserWithTicketInfo[] | null>(null);
  const toast = useToast();
  const [search, setSearch] = useState('');
  const [type, setType] = useState<SelectTypes>('');

  useEffect(() => {
    const getUsers = async () => {
      const res = await fetch('/api/getAllUsersTicketInfo');
      if (!res.ok) {
        toast({
          status: 'error',
          title: 'Error',
          description: 'Could not get users',
        });
      }
      const data: UserWithTicketInfo[] = await res.json();
      setUsers(data);
    };
    getUsers();
  }, [toast]);

  const filtered = useMemo(() => {
    if (!users) return null;
    if (!search && !type) return users;
    const searchLower = search.toLowerCase();
    return users.filter((user) => {
      let typeCheck: null | boolean = null;
      switch (type) {
        case 'has_ticket':
          typeCheck = user.has_ticket && !user.checked_in;
          break;
        case 'checked_in':
          typeCheck = user.checked_in;
          break;
        case 'no':
          typeCheck = !user.has_ticket;
          break;
        default:
          typeCheck = true;
      }
      const searchCheck = user.name.toLowerCase().includes(searchLower);
      return typeCheck && searchCheck;
    });
  }, [search, type, users]);

  if (!users) return <Spinner size="xl" />;

  return (
    <>
      <Flex direction="row" justify="center" mt={5} mb={1} minW="300px" maxW="700px" w="80%" gap={2}>
        <Input borderColor="gray.500" focusBorderColor="gray.600" _hover={{ borderColor: 'gray.600' }} minW="150px" maxW="500px" w="65%" placeholder="Search by name" value={search} onChange={(e) => setSearch(e.currentTarget.value)} />
        <Select borderColor="gray.500" focusBorderColor="gray.600" _hover={{ borderColor: 'gray.600' }} minW="150px" maxW="500px" w="35%" placeholder="Select Status" value={type} onChange={(e) => setType(e.currentTarget.value as SelectTypes)}>
          <option value="no">No Ticket</option>
          <option value="has_ticket">Has Ticket (Not CI)</option>
          <option value="checked_in">Checked In</option>
        </Select>
      </Flex>

      <Flex justify="center" mb={5} minW="300px" maxW="700px" w="80%">
        <Text fontSize="lg" minW="80px">{filtered?.length} results</Text>
      </Flex>

      <Flex gap={3} flexFlow="row wrap" justify="center">
        {filtered?.map((user) => (
          <NextLink href={`/admin/${user.id}`} key={user.id}>
            <a><UserCard user={user} /></a>
          </NextLink>
        ))}
      </Flex>
    </>
  );
};

export default UsersList;
