import { useGetFolderById } from "@/hooks/folder.hooks";
import { truncateString } from "@/utils/helpers/helpers";
import { Heading, Link, Text } from "@chakra-ui/react";
import { differenceInCalendarDays } from "date-fns";

interface ReadingListItemProps {
  folderId: string | undefined;
  paperTitle: string;
  paperDeadline?: Date;
}

export function ReadingFolderItem({
  folderId,
  paperTitle,
  paperDeadline,
}: ReadingListItemProps) {
  const { data: folder } = useGetFolderById(folderId ?? "");
  const today = new Date();
  const daysUntilDeadline = differenceInCalendarDays(paperDeadline!, today);
  return (
    <div className="flex px-2 py-1 flex-row items-center justify-between rounded-md transition ease-in-out delay-150 text-gray-600 hover:text-teal">
      <Heading isTruncated size="xs" fontWeight="500" className="mr-2">
        {paperTitle}
      </Heading>
      {paperDeadline && (
        <Text isTruncated fontSize="xs" color="orange">
          {daysUntilDeadline}d left
        </Text>
      )}
      {folder && (
        <Text isTruncated fontSize="xs" color="gray.500">
          {folder.name}
        </Text>
      )}
    </div>
  );
}
