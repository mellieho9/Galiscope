import { PlusIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";

interface AddFolderButtonProps {
  handleAddFolder: (folderName: string) => void;
}

export const AddFolderButton: React.FC<AddFolderButtonProps> = ({
  handleAddFolder,
}) => {
  const [inputValue, setInputValue] = useState<string>("");

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && inputValue.trim()) {
      handleAddFolder(inputValue);
      setInputValue("");
    }
  }

  return (
    <div className="flex flex-row items-center mt-2 py-2 cursor-pointer">
      <PlusIcon className="w-4 h-4 mr-4 text-teal" />
      <input
        type="text"
        placeholder="Add new topic"
        className="text-sm text-gray-800 font-normal bg-transparent border-none focus:outline-none"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};
