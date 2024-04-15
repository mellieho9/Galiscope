"use client";
import { HomeReadingCard } from "@/components/ReadingCard";
import { mockRecentlyRead } from "@/utils/mock";
import { Heading } from "@chakra-ui/react";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

export function RecentlyRead() {
  return (
    <div className="w-full space-y-4">
      <div className="flex flex-row items-center justify-between">
        <Heading size="sm">Recently read</Heading>
        <div className="flex flex-row items-center space-x-2 text-sm font-normal text-gray-500 transition ease-in-out delay-150  hover:text-teal hover:border-b border-teal">
          <span>View more</span>
          <ArrowRightIcon className="w-4 h-4" />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {mockRecentlyRead.map((item, index) => {
          return (
            <HomeReadingCard
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
