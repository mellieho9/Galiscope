import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Circle,
} from "@chakra-ui/react";
import { FolderMinusIcon, FolderPlusIcon } from "@heroicons/react/24/solid";

export function ReadingFolder({ folder, numIncompleteReads }) {
  return (
    <div>
      {/* icon  */}
      <Accordion allowMultiple>
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    {isExpanded ? (
                      <FolderPlusIcon className="w-4 h-4" />
                    ) : (
                      <FolderMinusIcon className="w-4 h-4" />
                    )}
                    {folder}
                  </Box>
                  {numIncompleteReads > 0 && (
                    <Circle size="1.25rem" bg="orange" color="white">
                      <p className="text-xs">{numIncompleteReads}</p>
                    </Circle>
                  )}
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>
    </div>
  );
}
