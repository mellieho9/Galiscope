"use client";
import React, { useState, useRef } from "react";
import {
  Box,
  InputGroup,
  InputRightElement,
  Input,
  IconButton,
  Button,
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
import DropdownMenu from "@/components/modals/DropDownMenu";

import CustomButton from "@/components/Button";
import { PDFDocument } from "pdf-lib";

interface PaperUploadProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaperUpload: React.FC<PaperUploadProps> = ({ isOpen, onClose }) => {
  const [pdf, setPdf] = useState<File | null>(null); // State to store the file name
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePanelClick = () => {
    fileInputRef.current?.click();
  };

  const [paperPdfLink, setPaperPdfLink] = React.useState("");
  const handleChangeFromWebLinkInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaperPdfLink(event.target.value);
  };

  const [dragging, setDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPdfPaper = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(paperPdfLink);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.blob();

      console.log("PDF loaded:", data);

      const arrayBuffer = await data.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const pdfTitle = pdf.getTitle() || "document.pdf";
      console.log(pdfTitle);
      const file = new File([data], pdfTitle, {
        type: "application/pdf",
      });
      console.log("PDF file:", file);
      setPdf(file);
    } catch (error) {
      console.error("Error fetching PDF:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
      const file: File = files[0];
      setPdf(file); // Update the state with the file name
      // Process the file upload here...
      e.dataTransfer.clearData();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setPdf(file); // Assume setPdf updates state; replace with your state management
      // Process the file as needed
    }
  };

  return (
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

          {pdf ? (
            <>
              <ModalBody pb={6}>
                <div className="flex flex-col gap-7">
                  <div className="border mt-5 border-gray-500 rounded-lg p-2">
                    <div className="flex flex-row items-center justify-between">
                      <p className="text-black">{pdf.name}</p>
                      <IconButton
                        aria-label="Call Segun"
                        size="xs"
                        icon={<XMarkIcon className="text-gray-500 w-4 h-4" />}
                        variant="ghost"
                        onClick={() => setPdf(null)}
                      />
                    </div>
                  </div>
                  <DropdownMenu />
                </div>
              </ModalBody>
              <ModalFooter>
                <CustomButton width="20%" mr={3} onClick={onClose}>
                  Read now
                </CustomButton>
                <Button
                  variant="outline"
                  color="gray.500"
                  borderRadius={"lg"}
                  border="1px"
                >
                  Read later
                </Button>
              </ModalFooter>
            </>
          ) : (
            <ModalBody pb={6}>
              <>
                <div
                  className={`bg-gray-200 mt-2 flex justify-center rounded-lg border hover:bg-gray-200 ${
                    dragging
                      ? "bg-gray-200 border-2"
                      : "border-dashed bg-gray-50"
                  } px-6 py-10 cursor-pointer`}
                  onClick={handlePanelClick}
                  onDragEnter={handleDragIn}
                  onDragLeave={handleDragOut}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center">
                    <CloudArrowUpIcon className="w-10 h-10 text-gray-600" />
                    <p className="mt-4 text-sm leading-6 text-gray-600">
                      Upload a file or drag and drop
                    </p>
                    <input
                      ref={fileInputRef}
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
                <Box mt={4}>
                  <p className="text-gray-500 uppercase font-semibold">or</p>
                </Box>

                <InputGroup size="md" mt={4}>
                  <Input
                    color="black"
                    focusBorderColor="teal.500"
                    pr="4.5rem"
                    placeholder="Insert link from the web"
                    onChange={handleChangeFromWebLinkInput}
                  />
                  <InputRightElement width="4.5rem">
                    <IconButton
                      variant="solid"
                      aria-label="Upload link"
                      h="1.75rem"
                      onClick={fetchPdfPaper}
                      icon={<ArrowUpOnSquareIcon className="w-4 h-4" />}
                    />
                  </InputRightElement>
                </InputGroup>
              </>
            </ModalBody>
          )}
        </Flex>
      </ModalContent>
    </Modal>
  );
};

export default PaperUpload;