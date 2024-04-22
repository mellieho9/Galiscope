import {
  Menu,
  MenuButton,
  IconButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import {
  ArrowTopRightOnSquareIcon,
  EllipsisHorizontalIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

interface FolderItemActionProps extends React.HTMLAttributes<HTMLDivElement> {
  handleDeleteFolder: () => void;
}

export function CardAction({
  handleDeleteFolder,
  ...props
}: FolderItemActionProps) {
  return (
    <div {...props}>
      <Menu>
        <MenuButton
          aria-label="Options"
          as={IconButton}
          icon={<EllipsisHorizontalIcon className="w-4 h-4" />}
          size="2xs"
          color="gray.500"
          bgColor="white"
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
            Delete diagram
          </MenuItem>
          <MenuItem
            fontSize="sm"
            fontWeight="normal"
            icon={
              <ArrowTopRightOnSquareIcon className="h-4 w-4 text-gray-500" />
            }
            onClick={handleDeleteFolder}
          >
            View diagram
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}
