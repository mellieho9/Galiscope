"use client";

import { Heading } from "@chakra-ui/react";
import { ReadingFolderItem } from "./ReadingFolderItem";
import { useMemo, useState } from "react";
import { ReadingFolder } from "./ReadingFolder";
import { FilterDropdown } from "./FilterDropdown";
import { useCurrentUser } from "@/contexts/UserContextProvider";
import { useGetDocumentsByUserId } from "@/hooks/document.hooks";
import { useGetFoldersByUserId } from "@/hooks/folder.hooks";

export function ReadingList() {
  const userData = useCurrentUser();
  const { data: user } = userData ?? {};

  const { data: documents = [] } = useGetDocumentsByUserId(user?.id ?? "");
  const { data: folders = [] } = useGetFoldersByUserId(user?.id ?? "");

  const readingList = useMemo(() => {
    return documents.filter((doc) => doc.status === "unread");
  }, [documents]);

  const [groupBy, setGroupBy] = useState("default");

  const handleGroupByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGroupBy(event.target.value);
  };

  return (
    <div className="w-full">
      <div className="space-y-1">
        <div className="flex flex-row justify-between items-center">
          <div>
            <Heading size="sm">Your reading list</Heading>
            <p className="text-sm font-normal text-gray-500">
              Click on one to read them
            </p>
          </div>
          <FilterDropdown onChange={handleGroupByChange} />
        </div>
        <div className="p-2">
          {groupBy === "folder" ? (
            folders.map((folder) => {
              const incompleteReads = readingList.filter(
                (doc) => doc.folder_id === folder.id
              );
              if (incompleteReads.length == 0){
                return;
              }
              return (
                <ReadingFolder
                  key={folder.id}
                  folder={folder.name}
                  incompleteReadList={incompleteReads}
            
                />
              );
            })
          ) : (
            readingList.map((doc) => (
              <ReadingFolderItem
                key={doc.id}
                folderId={doc.folder_id}
                paperTitle={doc.title}
                paperDeadline={doc.deadline}
              />
            ))
          )}
        </div>
        {/* TODO - add reading list  */}
      </div>
    </div>
  );
}
