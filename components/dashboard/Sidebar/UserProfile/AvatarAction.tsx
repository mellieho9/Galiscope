import { User } from '@/types/user.types';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Avatar,
  Heading,
  Text,
} from '@chakra-ui/react';
import {
  ArrowLeftEndOnRectangleIcon,
  ArrowLeftStartOnRectangleIcon,
} from '@heroicons/react/24/solid';

export function AvatarAction({ user, ...props }: { user: User, [key: string]: any }) {
  return (
    <div {...props}>
      <Menu>
        <MenuButton aria-label="Options">
          <Avatar bg="teal" size="sm" name="Meliora Ho" />
        </MenuButton>
        <MenuList>
          {/* Uncomment and complete this if needed
            <MenuItem
              fontSize="sm"
              fontWeight="normal"
              icon={<PencilSquareIcon className="h-4 w-4 text-gray-500" />}
            >
              Rename
            </MenuItem>
            */}
          <div className="flex flex-col px-3 py-2">
            <Heading size="sm">{user.name}</Heading>
            <Text fontSize="xs" color="gray.600" fontWeight="normal">
              {user.email}
            </Text>
          </div>
          <MenuItem
            fontSize="sm"
            fontWeight="normal"
            color="red"
            icon={
              <ArrowLeftStartOnRectangleIcon className="h-4 w-4 text-red" />
            }
          >
            Log out
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}
