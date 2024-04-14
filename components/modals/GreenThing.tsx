import { useState } from "react";
import {
  HStack,
  VStack,
  Text,
  IconButton,
  Button,
  Box,
  Flex,
} from "@chakra-ui/react";
import {
  SpeakerWaveIcon,
  PencilIcon,
  ArrowDownTrayIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const GreenThing = () => {
  const [showExportOptions, setShowExportOptions] = useState(false);
  // Toggle function to show/hide export options
  const toggleExportOptions = () => setShowExportOptions(!showExportOptions);

  return (
    <div>
      <HStack spacing={6} bg="teal" p={3} borderRadius="full" px={8}>
        <VStack>
          <IconButton
            aria-label="Speaker"
            icon={<SpeakerWaveIcon className="h-5 w-5 text-slate-300" />}
            variant="ghost"
            size="xl"
            isRound={true}
          />
          <Text fontSize="sm">Explain</Text>
        </VStack>
        <VStack>
          <IconButton
            aria-label="Edit"
            icon={<PencilIcon className="h-5 w-5 text-slate-300" />}
            variant="ghost"
            size="xl"
            isRound={true}
          />
          <Text fontSize="sm">Edit</Text>
        </VStack>

        {showExportOptions ? (
          <HStack bg="white" borderRadius="full" p={4} px={5}>
            <IconButton
              colorScheme="teal"
              onClick={toggleExportOptions}
              aria-label="Export"
              icon={<ArrowDownTrayIcon className="h-5 w-5" />}
              variant="ghost"
              size="xl"
              isRound={true}
            />
            <Flex flexDirection="column">
              <Box>
                <Text fontSize="sm" fontWeight="bold" color="teal">
                  Export as ...
                </Text>
              </Box>
              <HStack>
                <Button variant="link" size="sm" color="gray.500">
                  PNG
                </Button>
                <Button variant="link" size="sm" color="gray.500">
                  PDF
                </Button>
                <Button variant="link" size="sm" color="gray.500">
                  UML
                </Button>
              </HStack>
            </Flex>
          </HStack>
        ) : (
          <VStack>
            <IconButton
              onClick={toggleExportOptions}
              aria-label="Export"
              icon={<ArrowDownTrayIcon className="h-5 w-5 text-slate-300" />}
              variant="ghost"
              size="xl"
              isRound={true}
            />
            <Text fontSize="sm">Export</Text>
          </VStack>
        )}

        <VStack>
          <IconButton
            aria-label="Save"
            icon={<CheckCircleIcon className="h-5 w-5 text-slate-300" />}
            variant="ghost"
            size="xl"
            isRound={true}
          />
          <Text fontSize="sm">Save</Text>
        </VStack>
      </HStack>
    </div>
  );
};

export default GreenThing;
