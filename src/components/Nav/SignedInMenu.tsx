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
        <NextLink href="/panel"><a><MenuItem>User Panel</MenuItem></a></NextLink>
        {user.user_metadata.admin && (
          <>
            <NextLink href="/admin"><a><MenuItem>Admin Panel</MenuItem></a></NextLink>
            <NextLink href="/admin/terminal"><a><MenuItem>Stripe Terminal</MenuItem></a></NextLink>
          </>
        )}
      </MenuList>
    </Menu>
  );
};

export default SignedInMenu;
