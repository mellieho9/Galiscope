const mockFolderListItems: Array<{ folderTitle: string; numIncompleteReads: number; redirectTo: () => void }> = [
    {
      folderTitle: "Video captioning",
      numIncompleteReads: 3,
      redirectTo: () => console.log("Navigating to video captioning..."),
    },
    {
      folderTitle: "VideoQA",
      numIncompleteReads: 1, 
      redirectTo: () => console.log("Navigating to video qa..."),
    },
    {
      folderTitle: "Prompt Engineering",
      numIncompleteReads: 0,
      redirectTo: () => console.log("Navigating to prompt engineering..."),
    },
  ];
  
  export default mockFolderListItems;