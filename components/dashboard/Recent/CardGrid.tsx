"use client";
import { ReadingCard } from "@/components/ReadingCard";
import { useCurrentUser } from "@/contexts/UserContextProvider";
import { useGetDocumentsByUserId } from "@/hooks/document.hooks";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

export const CardGrid = () => {
  const router = useRouter();
  const { data: user } = useCurrentUser() ?? {};
  const { data: documents } = useGetDocumentsByUserId(user?.id ?? "");

  const reads = useMemo(() => {
    return documents?.filter((doc) => doc.status == 'read').sort((a, b) => {
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    }) ?? [];
  }, [documents]);

  return (
    <div className="flex flex-wrap gap-2">
      {reads.map((doc) => {
        return (
          <ReadingCard
            key={doc.id}
            paperTitle={doc.title}
            folderId={doc.folder_id ?? ""}
            lastUpdatedTime={doc.updated_at}
            onClick={() => router.push(`/associatePage/${doc.id}`)}
          />
        );
      })}
    </div>
  );
};
