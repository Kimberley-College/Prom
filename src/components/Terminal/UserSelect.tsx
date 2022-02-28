import {
  Select, Spinner, FormControl, FormLabel,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';

interface Props {
  userId: null | string;
  setUserId: (userId: string) => void;
}

interface ShortUser {
  name: string;
  id: string;
}

const UserSelect = ({ userId, setUserId }: Props) => {
  const [users, setUsers] = useState<ShortUser[] | null>(null);
  useEffect(() => {
    let isMounted = true;
    fetch('/api/getTicketlessUsers').then((res) => res.json()).then((data) => isMounted && setUsers(data));

    return () => { isMounted = false; };
  }, []);

  if (!users) return <Spinner />;

  return (
    <FormControl my={3}>
      <FormLabel>Select a user</FormLabel>
      <Select bgColor="gray.300" onChange={(e) => setUserId(e.target.value)} value={userId} placeholder="Select a user">
        {users.map((user) => (
          <option value={user.id} key={user.id}>{user.name}</option>
        ))}
      </Select>
    </FormControl>
  );
};

export default UserSelect;
