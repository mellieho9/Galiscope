import React, { useState } from "react";
import {
  Box,
  InputGroup,
  InputRightElement,
  Input,
  IconButton,
  Text,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Flex,
} from "@chakra-ui/react";
import {
  ArrowUpOnSquareIcon,
  CloudArrowUpIcon,
} from "@heroicons/react/24/outline";
import CustomButton from "@/components/Button";
const PaperUpload = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
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
              Upload the paper you want to read
            </ModalHeader>
            <ModalBody pb={6}>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-200">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <CloudArrowUpIcon
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                    />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 font-semibold">
                      Drag and drop a file
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>

              {uploadedFile ? (
                <>
                  <Box mt={4}>
                    <p className="text-gray-500 uppercase font-semibold">or</p>
                  </Box>

                  <InputGroup size="md" mt={4}>
                    <Input
                      color="black"
                      focusBorderColor="teal.500"
                      pr="4.5rem"
                      placeholder="Insert link from the web"
                    />
                    <InputRightElement width="4.5rem">
                      <IconButton
                        variant="ghost"
                        aria-label="Upload link"
                        h="1.75rem"
                        icon={<ArrowUpOnSquareIcon className="w-6 h-6" />}
                      />
                    </InputRightElement>
                  </InputGroup>
                </>
              ) : (
                // The else branch returns a single element, no need for a fragment
                <p className="text-sm font-semibold">{uploadedFile.name}</p>
              )}
            </ModalBody>
          </Flex>

          <ModalFooter>
            <CustomButton mr={3} onClick={onClose}>
              Read now
            </CustomButton>
            <Button variant="outline" borderRadius={"lg"} border="1px">
              Read later
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PaperUpload;
