import { Circle } from '@chakra-ui/react';
import { Squares2X2Icon } from '@heroicons/react/24/solid';
import React from 'react'; 

interface FolderListItemProps {
  folderTitle: string;
  numIncompleteReads: number;
  redirectTo?: () => void; 
}

const FolderListItem: React.FC<FolderListItemProps> = ({ folderTitle, numIncompleteReads }) => {
    return (
        <span 
            className="group flex flex-row items-center justify-between cursor-pointer p-2" 
        >
            <div className="flex flex-row items-center">
                <span className="w-3 h-3 mr-2 bg-gray-200"></span>
                <span className="text-sm font-normal">
                    {folderTitle}
                </span>
            </div>
            <div className="flex flex-row space-x-2 items-center">
                {numIncompleteReads > 0 && (
                    <Circle size='1.25rem' bg='orange' color='white'><p className="text-xs">{numIncompleteReads}</p></Circle>
                )}
                {/* TODO - handle delete and rename  */}
                <Squares2X2Icon className="w-4 h-4 text-gray-500 group-hover:block hidden" />
            </div>
        </span>
    );
}

export default FolderListItem;
