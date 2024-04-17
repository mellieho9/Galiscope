import { Box, Heading, Image, Text } from '@chakra-ui/react';
import diagram from '../app/diagram.svg';
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
      className="transition ease-in-out delay-150 hover:border rounded-lg hover:border-teal mr-7 mb-7 bg-gray-50"
      overflow="hidden"
      borderWidth="1px"
      borderRadius="lg"
    >
      <Image src={diagram.src} width="full" height="150px" />
      <div className="p-3 space-y-1 border-t border-gray-200 bg-white cursor-pointer">
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
