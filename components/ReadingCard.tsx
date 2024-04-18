import { Box, Heading, Image, Text } from "@chakra-ui/react";
import blurredImage from "../public/blurred_paper.png";
import { useGetFolderById } from "@/hooks/folder.hooks";
import { format } from "timeago.js";
import { PlusIcon } from "@heroicons/react/24/solid";
import React from "react";
import { data } from "autoprefixer";

interface ReadingCardProps {
  paperTitle: string;
  lastUpdatedTime?: string | number | Date;
  folderId: string;
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

export const ReadingCard: React.FC<ReadingCardProps> = ({
  paperTitle,
  folderId,
  lastUpdatedTime,
  ...props
}) => {
  const { data: folder } = useGetFolderById(folderId);

  return (
    <BaseCard folderId={folderId} paperTitle={paperTitle} borderColor="teal">
      <Heading isTruncated color="gray.600" size="xs">
        {paperTitle}
      </Heading>
      <div className="flex flex-row justify-between text-xs text-gray-500">
        <Text isTruncated>{folder?.name}</Text>
        {lastUpdatedTime != undefined && (
          <Text isTruncated>{format(lastUpdatedTime)}</Text>
        )}
      </div>
    </BaseCard>
  );
};

export const FolderCompleteCard: React.FC<
  Pick<ReadingCardProps, "paperTitle" | "lastUpdatedTime">
> = ({ paperTitle, lastUpdatedTime, ...props }) => (
  <BaseCard folderId={""} paperTitle={paperTitle} borderColor="teal" {...props}>
    <Heading isTruncated color="gray.600" size="xs">
      {paperTitle}
    </Heading>
    <div className="flex flex-row justify-end text-xs text-gray-500">
      {lastUpdatedTime != undefined && (
        <Text isTruncated>{format(lastUpdatedTime)}</Text>
      )}
    </div>
  </BaseCard>
);

export const IncompleteCard: React.FC<Pick<ReadingCardProps, "paperTitle">> = ({
  paperTitle,
}) => (
  <BaseCard folderId={""} paperTitle={paperTitle} borderColor="orange">
    <Heading isTruncated color="gray.600" size="xs">
      {paperTitle}
    </Heading>
  </BaseCard>
);
type AddCardProps = {
  handleClick: () => void;
};

export const AddCard: React.FC<AddCardProps> = ({ handleClick }) => (
  <div
    className={`transition ease-in-out delay-150 hover:border rounded-lg hover:bg-gray-100 hover:border-gray-500`}
    onClick={handleClick}
  >
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
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
