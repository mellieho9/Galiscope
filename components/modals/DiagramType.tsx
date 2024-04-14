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
    "Sequence Diagram":
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    Flowchart:
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    "ER Diagram":
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaGoptoy1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
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
                <HStack spacing={4} className="w-full">
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
