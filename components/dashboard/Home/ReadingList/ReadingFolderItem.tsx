import { Heading, Link, Text } from "@chakra-ui/react";

interface ReadingListItemProps {
  paperTitle: string;
  folder: string;
  paperUrl: string;
}

export function ReadingFolderItem({ paperTitle, folder, paperUrl }: ReadingListItemProps) {
  return (
    <div className="flex px-2 py-1 flex-row items-center justify-between rounded-md transition ease-in-out delay-150 hover:text-teal">
      <Heading size="xs"  fontWeight="600" className="mr-2">{paperTitle}</Heading>
      <Text fontSize="xs" color="gray.500">{folder}</Text>
      <Link fontSize="xs" color="gray.500">
        {paperUrl}
      </Link>
    </div>
  )
}
