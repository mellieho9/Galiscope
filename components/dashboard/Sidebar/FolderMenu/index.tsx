import mockFolderListItems from "@/utils/mock";
import FolderListItem from "./FolderListItem";
import { AddFolderButton } from "./AddFolderButton";

export function FolderMenu() {
  // TODO - Handle Add Folder

  return (
    <div className="border-t border-gray-200 p-4">
      <h3 className="font-medium text-sm">Folders</h3>
      <div className="flex flex-col p-2">
        {mockFolderListItems.map((item, index) => {
          return (
            <FolderListItem
              key={index}
              folderTitle={item.folderTitle}
              numIncompleteReads={item.numIncompleteReads}
              redirectTo={item.redirectTo}
            />
          );
        })}
        <AddFolderButton />
      </div>
    </div>
  );
}
