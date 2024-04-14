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
  XMarkIcon,
} from "@heroicons/react/24/outline";
import CustomButton from "@/components/Button";

const PaperUpload = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fileName, setFileName] = useState(""); // State to store the file name

  const [dragging, setDragging] = useState(false);

  const handleDragIn = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragOut = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragging(true);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFileName(file.name); // Update the state with the file name
      // Process the file upload here...
      e.dataTransfer.clearData();
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
              <div
                className={`bg-gray-200 mt-2 flex justify-center rounded-lg border ${
                  dragging
                    ? "border-teal-500 border-2"
                    : "border-dashed border-gray-900/25"
                } px-6 py-10`}
                onDragEnter={handleDragIn}
                onDragLeave={handleDragOut}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <div className="flex flex-col	items-center">
                  <CloudArrowUpIcon className="w-10 h-10 text-gray-600" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={(e) => {
                          const files = e.target.files;
                          if (files && files.length > 0) {
                            const file = files[0];
                            setFileName(file.name); // Update the state with the file name
                            // Process the file upload here...
                          }
                        }}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                </div>
              </div>

              {fileName ? (
                // The else branch returns a single element, no need for a fragment
                <div className="border-2 mt-5 border-black rounded-lg p-2">
                  <div className="flex flex-row items-center justify-between">
                    <p className="text-black">{fileName}</p>
                    <IconButton
                      aria-label="Call Segun"
                      size="xs"
                      icon={<XMarkIcon />}
                      variant="ghost"
                      onClick={() => setFileName("")}
                    />
                  </div>
                </div>
              ) : (
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
              )}
            </ModalBody>
          </Flex>

          <ModalFooter>
            <CustomButton width="20%" mr={3} onClick={onClose}>
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
