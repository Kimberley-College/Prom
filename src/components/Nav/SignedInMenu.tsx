import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spinner,
  Button,
} from '@chakra-ui/react';
import { useUser } from '@supabase/auth-helpers-react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { FaRegUser } from 'react-icons/fa';
import NextLink from 'next/link';
import { signout } from 'util/authHelpers';

const SignedInMenu = () => {
  const { user, isLoading } = useUser();
  if (isLoading || !user) return <Spinner />;
  return (
    <Menu>
      <MenuButton as={Button} leftIcon={<FaRegUser />} rightIcon={<ChevronDownIcon />}>
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
        {(user.user_metadata.admin || user.user_metadata.roles.includes('security')) && (
          <NextLink href="/security"><a><MenuItem>Security Panel</MenuItem></a></NextLink>
        )}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/api/auth/logout"><MenuItem onClick={signout}>Sign out</MenuItem></a>
      </MenuList>
    </Menu>
  );
};

export default SignedInMenu;
