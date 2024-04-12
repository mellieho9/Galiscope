"use client";

import { mockReadingListItems } from "@/utils/mock";
import { Heading } from "@chakra-ui/react";
import { ReadingFolderItem } from "./ReadingFolderItem";
import { useState } from "react";
import { ReadingFolder } from "./ReadingFolder";
import { FilterDropdown } from "./FilterDropdown";

export function ReadingList() {
  const [readingListItem, setReadingListItem] = useState(
    mockReadingListItems || []
  );

  const [groupBy, setGroupBy] = useState("default");

  const handleGroupByChange = (event) => {
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
            <ReadingFolder
              folder="Video captioning"
              incompleteReadList={readingListItem}
            />
          ) : (
            readingListItem.map((item, index) => (
              <ReadingFolderItem
                key={index}
                folder={item.folder}
                paperTitle={item.paperTitle}
                paperUrl={item.paperUrl}
              />
            ))
          )}
        </div>
        {/* TODO - add reading list  */}
      </div>
    </div>
  );
}
