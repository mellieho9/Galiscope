"use client";
import { ReadingCard } from "@/components/ReadingCard";
import { mockRecentlyRead } from "@/utils/mock";
import { useState } from "react";
export const CardGrid = () => {
  const [reads, setReads] = useState(mockRecentlyRead);
  return (
    <div className="flex flex-wrap gap-2">
      {reads.map((doc, index) => {
        return (
          <ReadingCard
            key={index}
            paperTitle={doc.paperTitle}
            folderId={doc.folder ?? ""}
            lastUpdatedTime={doc.lastUpdatedTime}
          />
        );
      })}
    </div>
  );
};
