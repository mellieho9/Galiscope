import { Avatar, Heading } from "@chakra-ui/react";

export function UserProfile() {
  return (
    <div className="p-4 border-b border-gray-200 flex flex-row justify-between items-center">
      <Avatar bg="teal" size="sm" name="Meliora Ho" />
      <Heading size="sm">
        Meliora Ho
      </Heading>
    </div>
  );
}
