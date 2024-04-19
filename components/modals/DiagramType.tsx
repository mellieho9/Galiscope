import {
  Box,
  HStack,
  VStack,
  Input,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Flex,
} from "@chakra-ui/react";
import CustomButton from "@/components/Button";
import { DiagramTypeCard } from "@/components/modals/DiagramTypeCard";

const DiagramType = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const diagramLinkMap = {
    "Sequence Diagram": "/diagram.svg",
    Flowchart: "/diagram.svg",
    "ER Diagram": "/diagram.svg",
  };
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent maxW="50vw">
          <Flex direction="column">
            <ModalHeader textAlign="center" color="teal" fontSize="xl">
              Select the diagram type for your selection
            </ModalHeader>
            <ModalBody pb={6}>
              <VStack mt={3}>
                <HStack className="w-full justify-between">
                  <DiagramTypeCard
                    content="Sequence Diagram"
                    imageLink={diagramLinkMap["Sequence Diagram"]}
                  />
                  <DiagramTypeCard
                    content="Flowchart"
                    imageLink={diagramLinkMap["Flowchart"]}
                  />
                  <DiagramTypeCard
                    content="ER Diagram"
                    imageLink={diagramLinkMap["ER Diagram"]}
                  />
                </HStack>

                <Box mt={4} className="w-full">
                  <Input
                    focusBorderColor="teal.500"
                    className="w-full"
                    placeholder=" I want to use a different type of diagram"
                    _placeholder={{ textAlign: "center" }}
                    borderRadius={"lg"}
                  />
                </Box>

                <Box mt={4} className="w-full">
                  <CustomButton className="w-full" colorScheme="teal" size="lg">
                    Submit
                  </CustomButton>
                </Box>
              </VStack>
            </ModalBody>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DiagramType;
