import { Box, Heading, Image, Text } from "@chakra-ui/react";
import blurredImage from "../app/blurred_paper.png";
interface ReadingCardProps {
  paperTitle: string;
  folder: string;
  lastUpdatedTime: string;
}

export const ReadingCard: React.FC<ReadingCardProps> = ({
  paperTitle,
  folder,
  lastUpdatedTime,
}) => {
  return (
    <Box
      overflow="hidden"
      borderWidth="1px"
      borderRadius="lg"
      maxWidth={225}
      
    >
      <Image src={blurredImage.src} width="full" display="fill" />
        <div className="p-2 space-y-1 border-t border-gray-200 bg-white hover:bg-gray-50 cursor-pointer">
        <Heading isTruncated color="gray.600" size="xs">
          {paperTitle}
        </Heading>
        <div className="flex flex-row justify-between text-xs text-gray-500">
          <Text isTruncated>{folder}</Text>
          <Text isTruncated>{lastUpdatedTime}</Text>
        </div>
        </div>
    </Box>
  );
};
