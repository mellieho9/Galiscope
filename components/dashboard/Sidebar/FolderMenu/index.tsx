import React, { useState } from 'react'; 
import { Folder, mockFolderListItems } from "@/utils/mock";
import FolderListItem from "./FolderListItem";
import { AddFolderButton } from "./AddFolderButton";


export function FolderMenu() {
  const [folders, setFolders] = useState<Folder[]>(mockFolderListItems);

  const handleAddFolder = (folderName: string) => {
    const newFolder: Folder = {
      folderTitle: folderName,
      numIncompleteReads: 0,
      redirectTo: () => console.log("New folder added") // Example functionality
    };
    setFolders(currentFolders => [...currentFolders, newFolder]);
  };

  const handleDeleteFolder = (index: number) => {
    const updatedFolders = folders.filter((_, i) => i !== index);
    setFolders(updatedFolders);
  };

  const handleRenameFolder = (index: number, newTitle: string) => {
    const updatedFolders = folders.map((folder, i) => {
      if (i === index) {
        return {...folder, folderTitle: newTitle};
      }
      return folder;
    });
    setFolders(updatedFolders);
  };

  return (
    <div className="border-t border-gray-200 p-4">
      <h3 className="font-medium text-sm">Folders</h3>
      <div className="flex flex-col p-1">
        {folders.map((item, index) => (
          <FolderListItem
            key={index}
            folderTitle={item.folderTitle}
            numIncompleteReads={item.numIncompleteReads}
            redirectTo={item.redirectTo}
            handleDeleteFolder={() => handleDeleteFolder(index)}
          />
        ))}
        <AddFolderButton handleAddFolder={handleAddFolder} />
      </div>
    </div>
  );
}
