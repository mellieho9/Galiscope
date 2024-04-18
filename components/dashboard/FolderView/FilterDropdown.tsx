import { ChangeEventHandler } from "react";
import { Heading, Select } from "@chakra-ui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

interface FilterDropdownProps {
  onChange: ChangeEventHandler<HTMLSelectElement>;
}

export function FilterDropdown({ onChange }: FilterDropdownProps) {
  return (
    <div className="flex flex-row items-center space-x-2">
      <div className="w-3/5">
        <Heading size="xs" color="gray.700" fontWeight="semibold">
          Group by
        </Heading>
      </div>
      <Select
        _focusWithin={{ borderColor: "teal" }}
        variant="outline"
        size="sm"
        onChange={onChange}
        icon={<ChevronDownIcon className="w-5 h-5 text-gray-500" />}
      >
        <option value="default">default</option>
        <option value="incomplete">incomplete</option>
        <option value="complete">complete</option>
      </Select>
    </div>
  );
}
