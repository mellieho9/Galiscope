import { Heading, Select } from "@chakra-ui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export function FilterDropdown({ onChange }) {
  return (
    <div className="w-1/5 flex flex-row items-center space-x-2">
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
      >
        <option value="default">default</option>
        <option value="folder">folder</option>
      </Select>
    </div>
  );
}
