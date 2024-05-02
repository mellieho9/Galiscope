import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

interface ReadLaterModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleReadLater: (completionDate: Date) => Promise<void>;
  selectedFolderId: string;
}

export const ReadLaterModal: React.FC<ReadLaterModalProps> = ({
  isOpen,
  handleReadLater,
  onClose,
  selectedFolderId,
}) => {
  const [completionDate, setCompletionDate] = useState<Date | null>(null);
  const route =
    selectedFolderId == "" || selectedFolderId == undefined
      ? "/dashboard"
      : `/dashboard/${selectedFolderId}`;
  const router = useRouter();
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setCompletionDate(new Date(e.target.value));
    } else {
      setCompletionDate(null);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <ModalContent>
        <ModalHeader textAlign="center" color="teal">
          When do you want to complete reading this paper by?
        </ModalHeader>
        <ModalBody>
          <div className="w-full text-gray-500 p-2 justify-center rounded-md border border-gray-200">
            <input
              type="date"
              placeholder="Select date"
              value={
                completionDate ? completionDate.toISOString().split("T")[0] : ""
              }
              onChange={handleDateChange}
              className="w-full focus:outline-none"
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            bgColor="teal"
            color="white"
            mr={3}
            onClick={() => {
              handleReadLater(completionDate!);
              router.push(route);
            }}
          >
            Bookmark
          </Button>
          <Button variant="outline" color="gray.700" onClick={onClose}>
            Back to upload
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReadLaterModal;
