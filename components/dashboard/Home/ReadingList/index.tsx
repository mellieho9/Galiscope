"use client" 

import { mockReadingListItems } from "@/utils/mock";
import { Heading } from "@chakra-ui/react";
import { ReadingFolderItem } from "./ReadingFolderItem";
import { useState } from "react";

export function ReadingList() {
const [readingListItem, setReadingListItem] = useState(mockReadingListItems || []);

  return (
    <div className="w-full">
      <div className="space-y-1">
        <Heading size="sm">Your reading list</Heading>
        <p className="text-sm font-normal text-gray-500">
          Click on one to read them
        </p>
        <div className="p-2">
        {
            readingListItem.map((item, index) => {
                return(
                    <ReadingFolderItem key={index} folder={item.folder} paperTitle={item.paperTitle} paperUrl={item.paperUrl} />
                )
            })
        }
        </div>
        {/* TODO - add reading list  */}
      </div>
    </div>
  );
}
