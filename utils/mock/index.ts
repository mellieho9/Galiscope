export interface Folder {
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

export const mockReadFolder = [
  {
    paperTitle: "LongVLM: Efficient Long Video Understanding via Large Language Models"
  },
  {
    paperTitle: "World Model on Million-Length Video And Language With Blockwise RingAttention"
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
  },
  {
    paperTitle: 'Cross-modal Visual and Textural Summarization of Videos',
    folder: "Video captioning",
    lastUpdatedTime: "10 days ago"
  }
]

export const mockMessage = [
  {
    user: "Meliora Ho",
    message: "Explain this diagram"
  },
  {
    user: "Galiscope",
    message: "The goal is to create video summaries that are significantly shorter than the original videos (no more than 15% of the original length), along with text summaries that semantically align with the video summaries.\n\nThe researchers started with the ActivityNet Captions dataset, which already contains text captions temporally aligned to segments of long videos. They combined these captions to create text summaries for the full videos.\nHowever, the video segments from ActivityNet that the captions are aligned to cover a very large portion (94.6% on average) of the original videos. This defeats the purpose of having a concise video summary.\n\nTo address this, the researchers re-annotated the video segments to create abridged versions that better align with the text captions while being much shorter (ideally around 15% of the original video length).\nGiven the subjective nature of summarizing long videos, obtaining perfect ground truth labels is difficult. So, they had 10 different workers annotate shortened video segments for each text caption description.\nDuring evaluation, the system's predicted video summary is compared against all 10 human annotations for that caption, and the average score is taken.\n\nTo ensure annotation quality, 40 workers re-annotated all 140,010 summarized video spans over 2 months. Every day, 15% of the annotations were randomly evaluated, and if over 90% were accurate, that batch was approved. Otherwise, it had to be re-annotated.\n\nThis re-annotation process aimed to create abridged video segments (around 15% of original length) that align well with the text captions.\n\nFinally, the initial ActivityNet dataset was filtered to only include videos where the length of the summary is within 20% of the original length.\n\nThis rigorous process of creating high-quality, concise, semantically-aligned video/text summaries is critical for the paper's goal of developing cross-modal video summarization methods that can generate informative summaries across both modalities."
  },
  {
    user: "Meliora Ho",
    message: "What previous works/papers were used in this stage?"
  },
  {
    user: "Galiscope",
    message: "Based on the paragraph, the authors cite the following previous works that were leveraged in their approach:\n\nActivityNet - This is an existing dataset that contains video captions with temporal segments aligned to long videos. The authors used this as a starting point to obtain initial text summaries by concatenating the captions.\nTVSum - This is an existing dataset that contains text summaries of a video. The authors used the paper’s approach to handle inherent subjectivity in summarizing long videos.\n\nSpecifically, they mention following the methodology from these papers of having multiple workers (10 in their case) annotate shortened video spans corresponding to the same text description/caption. During evaluation, their system's predictions were compared against all 10 human annotations per caption."
  }
];
