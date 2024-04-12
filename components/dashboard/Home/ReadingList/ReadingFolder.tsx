import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Circle,
  Heading,
} from "@chakra-ui/react";
import { FolderMinusIcon, FolderPlusIcon } from "@heroicons/react/24/solid";
import { ReadingFolderItem } from "./ReadingFolderItem";

interface ReadingItem {
  paperTitle: string;
  folder: string;
  paperUrl: string;
}

type ReadingFolderProps = {
  folder: string;
  incompleteReadList: ReadingItem[];
};

export function ReadingFolder({
  folder,
  incompleteReadList,
}: ReadingFolderProps) {
  const numIncompleteReads = incompleteReadList.length;
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
                      {isExpanded ? (
                        <FolderMinusIcon className="w-4 h-4 mr-2" />
                      ) : (
                        <FolderPlusIcon className="w-4 h-4 mr-2" />
                      )}
                      <Heading isTruncated size="xs" color="gray.700" fontWeight="600" className="mr-2">{folder}</Heading>
                    </div>
                    <div>
                      {numIncompleteReads > 0 && (
                        <Circle size="1.25rem" bg="orange" color="white">
                          <p className="text-xs">{numIncompleteReads}</p>
                        </Circle>
                      )}
                    </div>
                  </div>
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {incompleteReadList.map((item, index) => {
                  return (
                    <ReadingFolderItem
                      key={index}
                      paperTitle={item.paperTitle}
                      paperUrl={item.paperUrl}
                    />
                  );
                })}
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>
    </div>
  );
}
