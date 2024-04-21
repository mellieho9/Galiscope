import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { useCurrentUser } from '@/contexts/UserContextProvider';
import {
  useCreateFolder,
  useGetFoldersByUserId,
} from '@/hooks/folder.hooks';

interface DropdownMenuProps {
  selectedFolderId: string;
  setSelectedFolderId: (folderId: string) => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  selectedFolderId,
  setSelectedFolderId,
}: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');

  const { data: user } = useCurrentUser() ?? {};
  const { data: folders = [], refetch } = useGetFoldersByUserId(
    user?.id ?? ''
  );

  const { mutate: createFolder } = useCreateFolder({
    onSuccess: () => refetch(),
  });

  const toggleDropdown = () => setIsOpen(!isOpen);
  const dropdownRef = useRef<HTMLDivElement>(null); // Use generic type for DOM element reference

  const handleAddFolder = (folderName: string) => {
    if (user?.id) {
      createFolder({ name: folderName, user_id: user.id });
    }
  };

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (event.key === 'Enter' && inputValue.trim()) {
      handleAddFolder(inputValue);
      setInputValue('');
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCheckboxChange = (folderId: string) => {
    if (folderId === selectedFolderId) {
      return () => setSelectedFolderId('');
    } else {
      return () => setSelectedFolderId(folderId);
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        aria-expanded={isOpen}
        onClick={toggleDropdown}
        className="text-gray-500 w-full px-4 py-2 text-left bg-white border border-gray-500 rounded-lg shadow flex items-center justify-between focus:outline-none focus:ring-2 ring-gray-500 focus:border-transparent"
      >
        {selectedFolderId ? (
          folders.find((folder) => folder.id === selectedFolderId)?.name
        ) : ("Select a folder that you want")}
        {isOpen ? (
          <ChevronUpIcon className="w-4 h-4" />
        ) : (
          <ChevronDownIcon className="w-4 h-4" />
        )}
      </button>
      {isOpen && (
        <div className="absolute bg-white border border-black rounded-lg shadow w-full z-10">
          <div className="flex flex-col p-3 mb-5 gap-3">
            <ul role="menu">
              {folders.map((folder) => (
                <li
                  role="menuitem"
                  key={folder.id}
                  className="flex items-center p-1 rounded-md hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id={folder.name}
                    name={folder.name}
                    checked={folder.id === selectedFolderId}
                    onChange={handleCheckboxChange(folder.id)}
                    className="form-checkbox  h-4 w-4"
                    onClick={(e) => e.stopPropagation()} // Stop propagation to prevent li's onClick when clicking the checkbox directly
                  />
                  <label
                    htmlFor={folder.name}
                    className="ml-2 block text-gray-800"
                  >
                    {folder.name}
                  </label>
                </li>
              ))}
            </ul>
            <div className="flex flex-row items-center mt-2 py-2 cursor-pointer">
              <PlusIcon className="w-4 h-4 mr-4 text-teal" />
              <input
                type="text"
                placeholder="Add new folder"
                className="text-sm text-gray-800 font-normal bg-transparent border-none focus:outline-none"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
