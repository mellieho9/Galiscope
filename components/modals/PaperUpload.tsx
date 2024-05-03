"use client";
import React, { useState, useRef, useMemo } from "react";
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
import { useCurrentUser } from "@/contexts/UserContextProvider";
import { useCreateDocument } from "@/hooks/document.hooks";
import { useUploadDocumentFile } from "@/hooks/file.hook";
import { useQueryClient } from "@tanstack/react-query";
import { CreateDocumentParams } from "@/types/document.types";
import { useRouter } from "next/navigation";
import api from "@/utils/axios/axios";
import ReadLaterModal from "./ReadLaterModal";

interface PaperUploadProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaperUpload: React.FC<PaperUploadProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [selectedFolderId, setSelectedFolderId] = useState<string>("");
  const [pdf, setPdf] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  const { data: user } = useCurrentUser() ?? {};
  const { mutate: createDocument, isPending: creatingDocument } =
    useCreateDocument();
  const { mutate: uploadDocumentFile, isPending: uploadingDocumentFile } =
    useUploadDocumentFile();

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
      const { data: response } = await api.post(
        "/api/fetch-pdf",
        { url: paperPdfLink },
        {
          responseType: "blob",
        }
      );

      const data = new Blob([response], { type: "application/pdf" });
      const arrayBuffer = await data.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const pdfTitle =
        pdf.getTitle() || paperPdfLink.split("/").pop() || "document.pdf";

      const file = new File([data], pdfTitle, {
        type: "application/pdf",
      });

      setPdf(file);
    } catch (error) {
      // TODO: handle error (show notification, etc.)
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

  const handleCreateDocument = (
    newDocument: CreateDocumentParams,
    redirect: boolean = true
  ) => {
    console.log(newDocument);
    createDocument(newDocument, {
      onSuccess: async (data) => {
        await queryClient.refetchQueries({
          queryKey: ["get-documents-by-folder-id", selectedFolderId],
        });
        if (redirect) {
          router.push(`/pdfViewer/${data.id}`);
        }
      },
      onError: (error) => {
        // TODO: handle error (show notification, etc.)
        console.error("Error creating document:", error);
      },
    });
  };

  const handleReadNow = async () => {
    if (pdf && user?.id) {
      // Upload the document and retrieve the filepath
      uploadDocumentFile(
        { user_id: user.id, file: pdf },
        {
          onSuccess: (data) => {
            const { filepath } = data;
            // Create the document
            handleCreateDocument(
              {
                title: pdf.name,
                filepath,
                user_id: user.id,
                folder_id: selectedFolderId,
              },
              true
            );
          },
          onError: (error: any) => {
            // TODO: handle error (show notification, etc.)
            if (error.response?.data?.error?.statusCode === "409") {
              alert(
                "A document with the same name already exists in this folder. Please rename or choose a different document."
              );
            }
          },
        }
      );
    }
  };

  const handleReadLater = async (deadline: Date) => {
    if (pdf && user?.id) {
      // Upload the document and retrieve the filepath
      uploadDocumentFile(
        { user_id: user.id, file: pdf, deadline: deadline },
        {
          onSuccess: (data) => {
            const { filepath } = data;
            // Create the document
            handleCreateDocument(
              {
                title: pdf.name,
                filepath,
                user_id: user.id,
                folder_id: selectedFolderId,
                deadline: deadline,
              },
              false
            );
            console.log("successfully uploaded!");
          },
          onError: (error) => {
            // TODO: handle error (show notification, etc.)
            console.error("Error uploading document:", error);
          },
        }
      );
    }
  };

  const [openReadLater, setOpenReadLater] = useState(false);
  const handleOpenReadLater = () => {
    setOpenReadLater(true);
  };
  const handleCloseReadLater = () => {
    setOpenReadLater(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <ModalContent maxW="50vw">
        {openReadLater ? (
          <ReadLaterModal
            isOpen={openReadLater}
            onClose={handleCloseReadLater}
            handleReadLater={handleReadLater}
            selectedFolderId={selectedFolderId}
          />
        ) : (
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
                        <Input
                          className="text-gray-800"
                          value={pdf.name}
                          onChange={(e) => {
                            const newName = e.target.value;
                            setPdf(
                              new File([pdf], newName, { type: pdf.type })
                            );
                          }}
                          focusBorderColor="teal.500"
                        />
                        <IconButton
                          aria-label="Call Segun"
                          size="xs"
                          icon={<XMarkIcon className="text-gray-500 w-4 h-4" />}
                          variant="ghost"
                          onClick={() => setPdf(null)}
                        />
                      </div>
                    </div>
                    <DropdownMenu
                      selectedFolderId={selectedFolderId}
                      setSelectedFolderId={setSelectedFolderId}
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <CustomButton
                    isLoading={uploadingDocumentFile || creatingDocument}
                    width="20%"
                    mr={3}
                    isDisabled={uploadingDocumentFile || creatingDocument}
                    onClick={handleReadNow}
                  >
                    Read now
                  </CustomButton>
                  <Button
                    variant="outline"
                    color="gray.500"
                    borderRadius={"lg"}
                    border="1px"
                    isDisabled={uploadingDocumentFile || creatingDocument}
                    onClick={handleOpenReadLater}
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
                      onKeyDown={fetchPdfPaper}
                      onChange={handleChangeFromWebLinkInput}
                    />
                    <InputRightElement width="4.5rem">
                      <IconButton
                        variant="solid"
                        bgColor="gray.500"
                        color="white"
                        aria-label="Upload link"
                        h="1.75rem"
                        disabled={isLoading}
                        onClick={fetchPdfPaper}
                        icon={<ArrowUpOnSquareIcon className="w-4 h-4" />}
                      />
                    </InputRightElement>
                  </InputGroup>
                </>
              </ModalBody>
            )}
          </Flex>
        )}
      </ModalContent>
    </Modal>
  );
};

export default PaperUpload;
