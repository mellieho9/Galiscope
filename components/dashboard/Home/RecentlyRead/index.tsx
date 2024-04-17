"use client";
import { ReadingCard } from "@/components/ReadingCard";
import { useCurrentUser } from "@/contexts/UserContextProvider";
import { useGetDocumentsByUserId } from "@/hooks/document.hooks";
import { mockRecentlyRead } from "@/utils/mock";
import { Heading } from "@chakra-ui/react";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { useMemo } from 'react';

export function RecentlyRead() {
  const userData = useCurrentUser();
  const { data: user } = userData ?? {};

  const { data: documents = [] } = useGetDocumentsByUserId(user?.id ?? "");
  const  recentlyRead = useMemo(() => documents.filter((doc) => doc.status === "read").sort((a, b) => {
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
  }), [documents]);

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
        {recentlyRead.map((doc, index) => {
          return (
            <ReadingCard
              key={doc.id}
              paperTitle={doc.title}
              folderId={doc.folder_id ?? ""}
              lastUpdatedTime={doc.updated_at}
            />
          );
        })}
      </div>
    </div>
  );
}
