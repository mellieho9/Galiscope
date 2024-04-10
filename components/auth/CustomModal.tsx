import {
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { OAuthButtons } from "./OAuthButtons";
import CustomButton from "../Button";

export const CustomModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalView, setModalView] = useState('signup'); // 'signup' or 'login'

  const toggleModalView = () => {
    setModalView((prevView) => (prevView === 'signup' ? 'login' : 'signup'));
  };

  return (
    <>
      <CustomButton w="3xs" shadow="md" onClick={onOpen}>Get Started</CustomButton>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalView === 'signup' ? 'Sign up' : 'Log in'} to use Galiscope</ModalHeader>
          <ModalCloseButton />
          <ModalBody paddingBottom="6">
            <VStack spacing={9}>
              <OAuthButtons  />
              {modalView === 'signup' ? (
                <Text className="relative left-0" color="gray.500">Have an account? <Link color="teal" onClick={() => { toggleModalView(); }}>Log in</Link></Text>
              ) : (
                <Text className="relative left-0" color="gray.500">Don't have an account? <Link color="teal" onClick={() => { toggleModalView(); }}>Sign up</Link></Text>
              )}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
