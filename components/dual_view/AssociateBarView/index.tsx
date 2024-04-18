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
      <Heading className="mb-10" fontSize="3xl" color="teal">
        {paperTitle}
      </Heading>
      <Heading className="mb-3" fontSize="lg">
        Sections read
      </Heading>
      <div className="flex items-center justify-between ml-2 mb-7">
        <WrapItem>
          <BookmarkIcon className="h-6 w-6 mr-2" fill="none" stroke="teal" />
          <div>Evaluation</div>
        </WrapItem>
        <WrapItem>
          <Center className="rounded-full mr-1" w='25px' h='25px' bg='teal' color='white'>
            6
          </Center>
          <Box className='cursor-pointer' onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <ChevronUpIcon className="h-5 w-5" color="gray" /> : <ChevronDownIcon className="h-5 w-5" color="gray"/>}
          </Box>
        </WrapItem>
      </div>
      {isExpanded && <DiagramGrid />}
    </div>
  );
};
