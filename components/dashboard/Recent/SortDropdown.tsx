import { ChangeEvent } from "react";
import { Select, Heading } from "@chakra-ui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

interface SortDropdownProps {
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ onChange }) => {
  return (
    <div className="flex flex-row items-center space-x-2">
      <div className="w-3/5">
        <Heading size="xs" color="gray.700" fontWeight="semibold">
          Sort by
        </Heading>
      </div>
      <Select
        _focusWithin={{ borderColor: "teal" }}
        variant="outline"
        size="sm"
        onChange={onChange}
        icon={<ChevronDownIcon className="w-4 h-4 text-gray-500" />}
      >
        <option value="alphabetical">Alphabetical</option>
        <option value="last_viewed">Last viewed</option>
        {/* Divider should not be used between options in a select */}
        <option value="oldest_first">Oldest first</option>
        <option value="newest_first">Newest first</option>
      </Select>
    </div>
  );
};

export default SortDropdown;
