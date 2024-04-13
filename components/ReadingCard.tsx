import { Box, Heading, Image, Text } from "@chakra-ui/react";
import blurredImage from "../app/blurred_paper.png";
import { useGetFolderById } from "@/hooks/folder.hooks";
import { format } from "timeago.js";
interface ReadingCardProps {
  paperTitle: string;
  folderId: string;
  lastUpdatedTime: Date;
}

export const ReadingCard: React.FC<ReadingCardProps> = ({
  paperTitle,
  folderId,
  lastUpdatedTime,
}) => {
  const { data: folder } = useGetFolderById(folderId);

  return (
    <div className="transition ease-in-out delay-150 hover:border rounded-lg hover:border-teal">
      <Box overflow="hidden"  borderWidth="1px" borderRadius="lg" maxWidth={225}>
        <Image src={blurredImage.src} width="full" display="fill" />
        <div className="p-2 space-y-1 border-t border-gray-200 bg-white cursor-pointer">
          <Heading isTruncated color="gray.600" size="xs">
            {paperTitle}
          </Heading>
          <div className="flex flex-row justify-between text-xs text-gray-500">
            <Text isTruncated>{folder?.name}</Text>
            <Text isTruncated>{format(lastUpdatedTime)}</Text>
          </div>
        </div>
      </Box>
    </div>
  );
};
