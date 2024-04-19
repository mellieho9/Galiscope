import { Heading} from "@chakra-ui/react";
import { CustomAccordion } from "./CustomAccordion";

interface AssociateBarViewProps {
  paperTitle: string;
}

export interface CardProps {
  paperTitle: string;
  folder: string;
  lastUpdatedTime: string;
}

export const AssociateBarView: React.FC<AssociateBarViewProps> = ({
  paperTitle,
}) => {
  const diagramCardsData = [
    {
      title: "System Architecture",
      location: "Page 45",
    },
    {
      title: "Workflow Process",
      location: "Page 22",
    },
    {
      title: "Network Topology",
      location: "Page 78",
    },
  ];
  return (
    <div className="w-full p-10 min-h-screen space-y-4 bg-white">
      <Heading className="mb-10" fontSize="xl" color="teal">
        {paperTitle}
      </Heading>
      <Heading className="mb-3" fontSize="md" color="black">
        Sections read
      </Heading>
      <CustomAccordion sectionTitle="Evaluation" diagrams={diagramCardsData} />
    </div>
  );
};
