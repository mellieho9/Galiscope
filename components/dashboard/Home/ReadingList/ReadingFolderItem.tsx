import { useGetFolderById } from "@/hooks/folder.hooks";
import { truncateString } from "@/utils/helpers/helpers";
import { Heading, Link, Text } from "@chakra-ui/react";

interface ReadingListItemProps {
  folderId: string | undefined;
  paperTitle: string;
  paperUrl: string;
}

export function ReadingFolderItem({ folderId, paperTitle, paperUrl }: ReadingListItemProps) {
  const { data: folder } = useGetFolderById(folderId ?? "");

  return (
    <div className="flex px-2 py-1 flex-row items-center justify-between rounded-md transition ease-in-out delay-150 text-gray-600 hover:text-teal">
      <Heading isTruncated size="xs" fontWeight="500" className="mr-2">{paperTitle}</Heading>
      {folder && <Text isTruncated fontSize="xs" color="gray.500">{folder.name}</Text>}
      <Link isTruncated fontSize="xs" color="gray.500" className="" isExternal>
        {truncateString(paperUrl, 30)}
      </Link>
    </div>
  );
}
