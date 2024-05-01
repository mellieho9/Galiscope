import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Box,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface ReadLaterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReadLaterModal: React.FC<ReadLaterModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [completionDate, setCompletionDate] = useState("");

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
              value={completionDate}
              onChange={(e) => setCompletionDate(e.target.value)}
              className="w-full focus:outline-none"
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            bgColor="teal"
            color="white"
            mr={3}
            onClick={() => console.log("Bookmarking for", completionDate)}
          >
            Bookmark
          </Button>
          <Button variant="outline" color="gray.700" onClick={onClose}>
            Skip
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReadLaterModal;
