import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spinner,
  Button,
} from '@chakra-ui/react';
import { useUser } from '@supabase/supabase-auth-helpers/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';

const SignedInMenu = () => {
  const { user, isLoading } = useUser();
  if (isLoading || !user) return <Spinner />;
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        {user.user_metadata.proper_name}
      </MenuButton>
      <MenuList>
        <NextLink href="/panel"><MenuItem>User Panel</MenuItem></NextLink>
        {user.user_metadata.admin && (
          <>
            <NextLink href="/admin"><MenuItem>Admin Panel</MenuItem></NextLink>
            <NextLink href="/admin/69420/terminal"><MenuItem>Buy yourself a ticket</MenuItem></NextLink>
          </>
        )}
      </MenuList>
    </Menu>
  );
};

export default SignedInMenu;
