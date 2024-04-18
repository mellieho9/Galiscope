import {
  Box,
  Center,
  Heading,
  WrapItem,
} from '@chakra-ui/react';
import { BookmarkIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { DiagramGrid } from './DiagramGrid';
import { useState } from 'react';

interface AssociateBarViewProps {
  paperTitle: string;
}

export interface CardProps {
  paperTitle: string;
  folder: string;
  lastUpdatedTime: string;
}

export const AssociateBarView: React.FC<AssociateBarViewProps> = ({
  paperTitle,
}) => {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <div className="w-full py-20 px-14 min-h-screen bg-white">
      <Heading className="mb-10" fontSize="xl" color="teal">
        {paperTitle}
      </Heading>
      <Heading className="mb-3" fontSize="md" color="black">
        Sections read
      </Heading>
      <div className="flex items-center justify-between ml-2 mb-7">
        <div className="flex flex-row space-x-1 items-center">
          <BookmarkIcon className="h-4 w-4 mr-2" fill="none" stroke="teal" />
          <div className="text-sm text-gray-700">Evaluation</div>
        </div>
        <div className="flex flex-row space-x-1 items-center text-sm">
          <Center className="rounded-full mr-1" w='1.25rem' h='1.25rem' bg='teal' color='white'>
            6
          </Center>
          <Box className='cursor-pointer' onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <ChevronUpIcon className="h-4 w-4" color="gray" /> : <ChevronDownIcon className="h-5 w-5" color="gray"/>}
          </Box>
          </div>
      </div>
      {isExpanded && <DiagramGrid />}
    </div>
  );
};
