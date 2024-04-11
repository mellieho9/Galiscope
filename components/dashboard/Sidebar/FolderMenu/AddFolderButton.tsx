import { PlusIcon } from "@heroicons/react/24/solid";
import React from 'react'; // Ensure React is imported when using JSX

interface AddFolderButtonProps {
    handleAddFolder: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const AddFolderButton: React.FC<AddFolderButtonProps> = ({ handleAddFolder }) => {
    return (
        <div className="flex flex-row items-center mt-2 py-2 cursor-pointer">
            <PlusIcon className="w-4 h-4 mr-4 text-teal" />
            <input
                type="text"
                placeholder="Add new topic"
                className="text-sm text-gray-800 font-normal bg-transparent border-none focus:outline-none"
                onKeyDown={handleAddFolder}
            />
        </div>
    );
}
