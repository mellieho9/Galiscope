import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import diagram from '../../../app/diagram.svg';
import { BookmarkIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

interface AssociateBarViewProps {
  paperTitle: string;
}

export const AssociateBarView: React.FC<AssociateBarViewProps> = ({
  paperTitle,
}) => {
  return (
    <div className="w-full p-14 pb-8 min-h-screen bg-gray-50">
      {/* Heading  */}
      <Heading className="mb-10" fontSize="3xl" color="teal">
        {paperTitle}
      </Heading>
      <Heading className="mb-3" fontSize="lg">
        Sections read
      </Heading>
      <div className="flex items-center justify-between">
        <WrapItem>
          <BookmarkIcon className="h-7 w-7 mr-2" fill="none" stroke="teal" />
          <div>Evaluation</div>
        </WrapItem>
        <WrapItem>
          <Box
            className="h-7 w-7 mr-2 text-center rounded-full"
            border="2xl"
            bgColor="teal"
            color="white"
          >
            6
          </Box>
          <ChevronDownIcon className="h-6 w-6" color="gray" />
        </WrapItem>
      </div>
    </div>
  );
};
