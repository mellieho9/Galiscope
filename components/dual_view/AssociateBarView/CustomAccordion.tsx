
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Circle,
  Heading,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/solid";

import {
    BookmarkIcon
  } from "@heroicons/react/24/outline";
import { DiagramCard } from "@/components/DiagramCard";
import { UMLDiagram } from "@/types/uml-diagram.types";

interface CustomAccordionProps {
  sectionTitle: string;
  diagrams: UMLDiagram[];
}

export const CustomAccordion: React.FC<CustomAccordionProps> = ({
  sectionTitle,
  diagrams,
}) => {
  const numDiagram = diagrams.length;

  return (
    <div>
      <Accordion allowMultiple>
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton>
                  <div className="w-full flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center">
                      <BookmarkIcon className="w-4 h-4 text-teal" />
                      <Heading
                        isTruncated
                        size="xs"
                        color="gray.700"
                        fontWeight="600"
                        className="ml-2"
                      >
                        {sectionTitle}
                      </Heading>
                    </div>
                    {numDiagram > 0 && (
                      <Circle size="20px" bg="teal" mr={1} color="white">
                        <p className="text-xs">{numDiagram}</p>
                      </Circle>
                    )}
                  </div>
                  {isExpanded ? (
                    <ChevronUpIcon className="w-4 h-4 text-gray-500" />
                  ) : (
                    <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                  )}
                </AccordionButton>
              </h2>
              <AccordionPanel py={4}>
                <div className="flex flex-wrap gap-2">
                  {diagrams.map((diagram) => (
                    <DiagramCard
                      key={diagram.id}
                      diagram={diagram}
                    />
                  ))}
                </div>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>
    </div>
  );
};
