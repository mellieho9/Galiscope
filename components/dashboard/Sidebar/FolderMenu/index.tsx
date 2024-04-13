"use client";
import React, { useEffect, useState } from "react";
import FolderListItem from "./FolderListItem";
import { AddFolderButton } from "./AddFolderButton";
import { useCurrentUser } from "@/contexts/UserContextProvider";
import { useCreateFolder, useDeleteFolder, useGetFoldersByUserId, useUpdateFolder } from "@/hooks/folder.hooks";
import { Skeleton } from "@chakra-ui/react";

export function FolderMenu() {
  const userData = useCurrentUser();
  const { data: user } = userData ?? {};

  const { data: folders = [], isLoading, refetch: refetchFolder } = useGetFoldersByUserId(user?.id ?? "");
  const { mutate: createFolder } = useCreateFolder({
    onSuccess: () => refetchFolder(),
  });
  const { mutate: deleteFolder } = useDeleteFolder({
    onSuccess: () => refetchFolder(),
  });

  const handleAddFolder = (folderName: string) => {
    if (user?.id) {
      createFolder({ name: folderName, user_id: user.id });
    }
  };

  useEffect(() => {
    console.log('Update folders')
  }, [folders]);

  return (
    <div className="border-t border-gray-200 p-4">
      <h3 className="font-medium text-sm">Folders</h3>
      <div className="flex flex-col p-1">
        {isLoading ? <Skeleton color="gray.500" height={3} /> : folders.map((folder) => (
          <FolderListItem
            key={folder.id}
            folder={folder}
            redirectTo={() => console.log("Redirect to folder")} // Example functionality
            handleDeleteFolder={() => deleteFolder(folder.id)}
          />
        ))}
        <AddFolderButton handleAddFolder={handleAddFolder} />
      </div>
    </div>
  );
}
