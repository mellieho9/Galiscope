import { Heading } from "@chakra-ui/react";
import { AvatarAction } from "./AvatarAction";

export function UserProfile() {
  return (
    <div className="p-4 border-b border-gray-200 flex flex-row justify-between items-center">
      <AvatarAction />
      <Heading size="sm">
        Hi, Meliora!
      </Heading>
    </div>
  );
}
