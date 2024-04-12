import {
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Avatar,
    Heading,
    Text,
  } from "@chakra-ui/react";
  
  export function AvatarAction({ ...props }) {
    return (
      <div {...props}>
        <Menu>
          <MenuButton
            aria-label="Options"
          >
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
                <Heading size="sm">Meliora Ho</Heading>
                <Text fontSize="xs" color="gray.600" fontWeight="normal">meliorah@gmail.com</Text>
            </div>
            <MenuItem
              fontSize="sm"
              fontWeight="normal"
              color="red"
            >
              Log out
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    );
  }
  