"use client";
import { Box, Heading } from "@chakra-ui/react";
import {
  AddCard,
  FolderCompleteCard,
  IncompleteCard,
} from "@/components/ReadingCard";
import { mockReadFolder } from "@/utils/mock";
import { FilterDropdown } from "./FilterDropdown";
import { useState } from "react";
import PaperUpload from "@/components/modals/PaperUpload";

export function CardGrid() {
  const [showUpload, setShowUpload] = useState(false);
  const [groupBy, setGroupBy] = useState("default");

  const handleClick = () => {
    setShowUpload(true);
  };

  const handleGroupByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGroupBy(event.target.value);
    console.log(groupBy);
  };

  return (
    <Box className="w-full space-y-4">
      <div className="flex flex-row justify-between items-center">
        <Heading size="sm" color="gray.800">
          Readings
        </Heading>
        <FilterDropdown onChange={handleGroupByChange} />
      </div>
      <Box display="flex" flexWrap="wrap" gap="2">
        {/* Displaying recently read items */}
        <AddCard handleClick={handleClick} />
        {showUpload && <PaperUpload />}
        {/* Displaying folder complete and incomplete items */}
        {mockReadFolder.map((item, index) =>
          item.folder && item.lastUpdatedTime
            ? groupBy !== "incomplete" && (
                <FolderCompleteCard
                  key={index}
                  paperTitle={item.paperTitle}
                  lastUpdatedTime={item.lastUpdatedTime}
                />
              )
            : groupBy !== "complete" && (
                <IncompleteCard key={index} paperTitle={item.paperTitle} />
              )
        )}
      </Box>
    </Box>
  );
}
