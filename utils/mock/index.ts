interface Folder {
  folderTitle: string;
  numIncompleteReads: number;
  redirectTo: () => void;
}

export const mockFolderListItems: Folder[] = [
  {
    folderTitle: "Video captioning",
    numIncompleteReads: 3,
    redirectTo: () => console.log("Navigating to video captioning..."),
  },
  {
    folderTitle: "VideoQA",
    numIncompleteReads: 1,
    redirectTo: () => console.log("Navigating to video QA..."),
  },
  {
    folderTitle: "Prompt Engineering",
    numIncompleteReads: 0,
    redirectTo: () => console.log("Navigating to prompt engineering..."),
  },
];

interface ReadingListItem {
  paperTitle: string,
  paperUrl: string,
  folder: string
}

export const mockReadingListItems: ReadingListItem[] = [
  {
    paperTitle:"VATEX: A Large-Scale, High-Quality Multilingual Dataset for Video-and-Language Research",
    paperUrl: "https://arxiv.org/pdf/1904.03493.pdf",
    folder: "Video captioning",
  },
  {
    paperTitle:"VATEX: A Large-Scale, High-Quality Multilingual Dataset for Video-and-Language Research",
    paperUrl: "https://arxiv.org/pdf/1904.03493.pdf",
    folder: "Video captioning",
  },
  {
    paperTitle:"VATEX: A Large-Scale, High-Quality Multilingual Dataset for Video-and-Language Research",
    paperUrl: "https://arxiv.org/pdf/1904.03493.pdf",
    folder: "Video captioning",
  }
]

export const mockRecentlyRead = [
  {
    paperTitle: 'Cross-modal Visual and Textural Summarization of Videos',
    folder: "Video captioning",
    lastUpdatedTime: "10 days ago"
  },
  {
    paperTitle: 'Cross-modal Visual and Textural Summarization of Videos',
    folder: "Video captioning",
    lastUpdatedTime: "10 days ago"
  },
  {
    paperTitle: 'Cross-modal Visual and Textural Summarization of Videos',
    folder: "Video captioning",
    lastUpdatedTime: "10 days ago"
  }
]