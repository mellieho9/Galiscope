import { Circle } from '@chakra-ui/react';
import { Squares2X2Icon } from '@heroicons/react/24/solid';
import React from 'react'; 
import { FolderItemAction } from './FolderItemAction';

interface FolderListItemProps {
  folderTitle: string;
  numIncompleteReads: number;
  redirectTo?: () => void; 
  handleDeleteFolder: () => void;
}

const FolderListItem: React.FC<FolderListItemProps> = ({ folderTitle, numIncompleteReads, handleDeleteFolder }) => {
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
                <FolderItemAction handleDeleteFolder={handleDeleteFolder} className="group-hover:block group-active:block hidden" />
            </div>
        </span>
    );
}

export default FolderListItem;
