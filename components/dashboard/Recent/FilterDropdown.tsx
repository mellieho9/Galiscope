import { ChangeEvent } from "react";
import { Heading, Select } from "@chakra-ui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

interface FilterDropdownProps {
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ onChange }) => {
  return (
    <div className="flex flex-row items-center space-x-2">
      <div className="w-3/5">
        <Heading size="xs" color="gray.700" fontWeight="semibold">
          Filter by
        </Heading>
      </div>
      <Select
        _focusWithin={{ borderColor: "teal" }}
        variant="outline"
        size="sm"
        onChange={onChange}
        icon={<ChevronDownIcon className="w-4 h-4 text-gray-500" />}
      >
        <option value="all">All papers</option>
        {/* Divider cannot be used directly within Select; it needs to be handled differently if needed */}
        <option value="folder">Video QA</option>
      </Select>
    </div>
  );
};

export default FilterDropdown;
