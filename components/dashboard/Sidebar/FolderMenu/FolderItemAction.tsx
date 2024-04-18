import {
  Menu,
  MenuButton,
  IconButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { PencilSquareIcon, Squares2X2Icon, TrashIcon } from "@heroicons/react/24/solid";

interface FolderItemActionProps extends React.HTMLAttributes<HTMLDivElement> {
  handleDeleteFolder: () => void; 
}

export function FolderItemAction({ handleDeleteFolder, ...props } : FolderItemActionProps) {
  return (
    <div {...props}>
      <Menu>
        <MenuButton
          aria-label="Options"
          as={IconButton}
          icon={<Squares2X2Icon className="w-4 h-4" />}
          size="xs"
          color="gray.500"
        />
        <MenuList>
          {/* <MenuItem
            fontSize="sm"
            fontWeight="normal"
            icon={<PencilSquareIcon className="h-4 w-4 text-gray-500" />}
          >
            Rename
          </MenuItem> */}
          <MenuItem
            fontSize="sm"
            fontWeight="normal"
            icon={<TrashIcon className="h-4 w-4 text-gray-500" />}
            onClick={handleDeleteFolder}
          >
            Delete Folder
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}
