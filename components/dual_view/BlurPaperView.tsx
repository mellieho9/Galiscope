"use client";
import { Box, Button, FormControl, FormLabel, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import blurred_paper from "../../app/blurred_paper.png";
import { CursorArrowRaysIcon } from "@heroicons/react/24/solid";
import { ModalItem } from "./DiagramView/BottomModal/ModalItem";

export function BlurPaperView() { 
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div className="max-h-screen w-full overflow-y-auto">
      <div style={{ width: "100%", boxShadow: "none" }}>
        <Image src={blurred_paper.src} width="100%" />
        <Modal isOpen={true} onClose={onClose}>
        <ModalContent>
          <ModalItem icon={<CursorArrowRaysIcon />} title={""} />
          <ModalHeader>Click here to continue reading the paper</ModalHeader>
        </ModalContent>
        </Modal>
      </div>
    </div>
  )
}