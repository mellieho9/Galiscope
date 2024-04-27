import {
  Content,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import { prompt } from "./prompt";

export const MODEL_NAME = "gemini-1.0-pro";

export const generationConfig = {
  temperature: 0.2,
  topK: 1,
  topP: 1,
  maxOutputTokens: 1000,
};

export const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];

export let summary_history: Content[] = [
  {
    role: "user",
    parts: [{ text: `${prompt.summary}` }],
  },
  {
    role: "model",
    parts: [
      {
        text: "Hello! Please give me some text. I'm happy to summarize.",
      },
    ],
  },
  {
    role: "user",
    parts: [
      {
        text: "School violence occurs when school stakeholders, not limited to students and teachers, physically or verbally attack others on the campus. This violence has many forms, ranging from students fighting students, teachers punishing students, and students verbally abusing teachers, and these incidents are at an alarming rate worldwide. After conducting a survey of 96 countries and territories in 2019, The United Nations Educational, Scientific and Cultural Organization (UNESCO) delineate that nearly 30% of children are liable to one act of violence every month and 11.2% of them experienced sexual jokes, comments, or gestures (UNESCO, 2019). In South Korea, at least once did teachers inflict their acts of emotional maltreatment on students—with the number of approximately 20%—in the form of mockery or humiliation (Cheung et al., 2019). Meanwhile, 80% of American teachers encountered at least one of the 11 different acts of violence on campuses during their previous school years (Yang et al., 2021). More seriously, the prevalence of physical fighting among 68 low-to-middle-income countries is more than 36% and serious injuries account for nearly 43% (Han et al., 2019).",
      },
    ],
  },
  {
    role: "model",
    parts: [
      {
        text: "School violence is a global problem affecting both students and teachers. It includes physical fights, verbal abuse, and emotional maltreatment. Studies show alarming rates: 30% of children experience violence monthly, with 11.2% facing sexual harassment. In South Korea, 20% of students report emotional maltreatment by teachers, while 80% of American teachers have experienced violence on campus. Physical fights are prevalent in many countries, with serious injuries. This issue demands immediate attention and intervention.",
      },
    ],
  },
];

export let diagram_history: Content[] = [
  {
    role: "user",
    parts: [{ text: `${prompt.diagram}` }],
  },
  {
    role: "model",
    parts: [
      {
        text: "Hello! Please give me any questions about text, UML code or diagram. I'm happy to answer.",
      },
    ],
  },
  {
    role: "user",
    parts: [
      {
        text: "Diagram Type: Sequence. Text: 2.1. CCTV application in education: a double-edged sword\n\nResearch on the application of CCTV to combat school violence dates back to the mid twentieth century. Since its introduction into the educational context, many schools, especially in the United States (US), have increased the use of surveillance systems such as cameras and metal detectors to reduce crime and violence. When CCTV surveillance was first adopted, its intention was to protect against intruders, but its usage has shifted to internal observation and monitoring. Currently, CCTV is a common method for controlling school crimes and violence. However, there's concern about increased classroom misconduct, prompting the need for evidence to address wrongdoings.\n\nCCTV adoption aids in storing evidence for fair misconduct evaluation, controlling behaviors, and increasing self-surveillance awareness. Additionally, it's believed to reduce labor costs and improve student supervision effectiveness. Despite these benefits, CCTV implementation poses a trade-off between security and privacy. Some scholars argue that it decreases safety perception within schools and infringes on privacy rights. Furthermore, there's a concern that it may shift focus from behavioral education to crime detection and punishment, potentially increasing crime in certain contexts.\n\nThis raises questions about whether CCTV should be installed and how it should be managed in the education sector.",
      },
    ],
  },
  {
    role: "model",
    parts: [
      {
        text: "@startuml\n!pragma teoz true\ntitle CCTV Application in Education: A Double-Edged Sword\nparticipant Schools\nparticipant CCTV\nparticipant Students\nparticipant Teachers\n== Early Adoption and Purpose ==\nSchools -> CCTV: Installs CCTV for security and to prevent external intrusion\nnote right: Mid 20th Century - Present (US)\n== Transformation in Usage ==\nSchools -> CCTV: Shifts focus to internal observation and monitoring\nnote right: (Norris & Armstron, 1999)\n== Benefits ==\nSchools -> CCTV: Utilizes CCTV to control school crimes and violence\nnote right: (Fisher et al., 2021)\nSchools -> CCTV: Stores evidence of misconduct for fair evaluation\nnote right: Controls behavior, encourages self-surveillance (Birnhack and Perry-Hazan, 2020)\nSchools -> CCTV: Reduces labor costs and increases supervision effectiveness\nnote right: (Manolev et al., 2019)\n== Drawbacks ==\nStudents -> Schools: Express concerns about privacy intrusion and mistrust\nnote right: (Horton, 2012; Taylor, 2010)\nTeachers -> Schools: Express concerns about punitive environment and shift from education to punishment\nnote right: (Fisher et al., 2020)\nSchools -> CCTV: Questions effectiveness due to potential crime relocation or increase\nnote right: (Cerezo, 2013; McLean et al., 2013)\n== Uncertainty and Debate ==\nSchools -> Schools: Raises questions about CCTV implementation and management in education\n@enduml",
      },
    ],
  },
];
