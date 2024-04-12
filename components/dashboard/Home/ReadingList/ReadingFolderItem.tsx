import { Heading, Link, Text } from "@chakra-ui/react";

interface ReadingListItemProps {
  paperTitle: string;
  folder: string;
  paperUrl: string;
}

export function ReadingFolderItem({ paperTitle, folder, paperUrl }: ReadingListItemProps) {
  return (
    <div className="flex flex-row items-center justify-between hover:bg-gray-100 p-1 rounded-md">
      <Heading size="xs" color="gray.600" fontWeight="600" className="mr-2">{paperTitle}</Heading>
      <Text fontSize="xs" color="gray.500">{folder}</Text>
      <Link fontSize="xs" color="gray.500">
        {paperUrl}
      </Link>
    </div>
  )
}
