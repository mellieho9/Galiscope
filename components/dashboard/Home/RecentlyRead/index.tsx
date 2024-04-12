"use client";
import { ReadingCard } from "@/components/ReadingCard";
import { mockRecentlyRead } from "@/utils/mock";
import { Heading } from "@chakra-ui/react";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

export function RecentlyRead() {
  return (
    <div className="w-full space-y-4">
      <div className="flex flex-row justify-between">
        <Heading size="sm">Recently read</Heading>
        <div className="flex flex-row items-center space-x-2 text-sm font-normal text-gray-500">
          <span>View more</span>
          <ArrowRightIcon className="w-4 h-4" />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {mockRecentlyRead.map((item, index) => {
          return (
            <ReadingCard
              key={index}
              paperTitle={item.paperTitle}
              folder={item.folder}
              lastUpdatedTime={item.lastUpdatedTime}
            />
          );
        })}
      </div>
    </div>
  );
}
