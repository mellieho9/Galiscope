'use client';

import { Heading, Spinner } from "@chakra-ui/react";
import { AvatarAction } from "./AvatarAction";
import { useCurrentUser } from "@/contexts/UserContextProvider";

export function UserProfile() {
  const userData = useCurrentUser();
  const { data: user } = userData ?? {};

  return (
    <div className="p-4 border-b border-gray-200">
      {user ? (
        <div className="w-full flex flex-row justify-between items-center">
          <AvatarAction user={user} />
          <Heading size="sm">Hi, {user?.name}</Heading>
        </div>
      ) : <Spinner />}
    </div>
  );
}
