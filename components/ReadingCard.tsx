import { Box, Heading, Image, Text } from "@chakra-ui/react";
import blurredImage from "../app/blurred_paper.png";
import { PlusIcon } from "@heroicons/react/24/solid";
import React from "react";

interface ReadingCardProps {
  paperTitle: string;
  lastUpdatedTime?: string;
  folder?: string;
}

// Base card component for reusability and consistency
const BaseCard: React.FC<
  ReadingCardProps & { borderColor: string; children: React.ReactNode }
> = ({ borderColor, children }) => (
  <div
    className={`transition ease-in-out delay-150 hover:border rounded-lg hover:border-${borderColor}`}
  >
    <Box
      overflow="hidden"
      borderWidth="1px"
      borderRadius="lg"
      width="200px"
      height="200px"
      display="flex"
      flexDirection="column"
    >
      <Image
        src={blurredImage.src}
        width="full"
        height="70%"
        objectFit="cover"
      />
      <div className="flex-grow p-2 space-y-1 border-t border-gray-200 bg-white cursor-pointer">
        {children}
      </div>
    </Box>
  </div>
);

export const HomeReadingCard: React.FC<ReadingCardProps> = ({
  paperTitle,
  folder,
  lastUpdatedTime,
}) => (
  <BaseCard borderColor="teal" paperTitle={""}>
    <Heading isTruncated color="gray.600" size="xs">
      {paperTitle}
    </Heading>
    <div className="flex flex-row justify-between text-xs text-gray-500">
      <Text isTruncated>{folder}</Text>
      <Text isTruncated>{lastUpdatedTime}</Text>
    </div>
  </BaseCard>
);

export const FolderCompleteCard: React.FC<
  Pick<ReadingCardProps, "paperTitle" | "lastUpdatedTime">
> = ({ paperTitle, lastUpdatedTime }) => (
  <BaseCard borderColor="teal" paperTitle={""}>
    <Heading isTruncated color="gray.600" size="xs">
      {paperTitle}
    </Heading>
    <div className="flex flex-row justify-end text-xs text-gray-500">
      <Text isTruncated>{lastUpdatedTime}</Text>
    </div>
  </BaseCard>
);

export const IncompleteCard: React.FC<Pick<ReadingCardProps, "paperTitle">> = ({
  paperTitle,
}) => (
  <div
    className={`transition ease-in-out delay-150 hover:border rounded-lg hover:border-orange`}
  >
    <Box
      overflow="hidden"
      borderWidth="1px"
      borderRadius="lg"
      width="200px"
      height="200px"
      display="flex"
      flexDirection="column"
    >
      <Box
        width="full"
        height="70%"
        bg="sunshine" // You can adjust the shade of orange as needed
        objectFit="cover"
      />
      <div className="flex-grow p-2 space-y-1 border-t border-gray-200 bg-white cursor-pointer">
        <Heading isTruncated color="gray.600" size="xs">
          {paperTitle}
        </Heading>
      </div>
    </Box>
  </div>
);

export const AddCard: React.FC = () => (
  <div
    className={`transition ease-in-out delay-150 hover:border rounded-lg hover:bg-gray-100 hover:border-gray-500`}
  >
    <Box
      display="flex" // Enables flexbox layout
      alignItems="center" // Vertically centers the content
      justifyContent="center" // Horizontally centers the content
      overflow="hidden"
      borderWidth="1px"
      borderRadius="lg"
      width="200px"
      height="200px"
    >
      <div className="flex flex-row justify-center items-center space-x-2 text-gray-500">
        <PlusIcon className="w-4 h-4" />
        <Text>New Read</Text>
      </div>
    </Box>
  </div>
);
