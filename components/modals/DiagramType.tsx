import {Card, Box, CardBody, Image, HStack, VStack, CardHeader, InputGroup, InputRightElement, Input, IconButton, Text, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Flex} from '@chakra-ui/react'
import {DocumentArrowUpIcon, CheckCircleIcon} from "@heroicons/react/24/outline"
import {DiagramTypeCard} from "@/components/modals/DiagramTypeCard";
import { useState } from 'react'

const DiagramType = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isActive, setIsActive] = useState(false)
  return (
      <>
        <Button onClick={onOpen}>Open Modal</Button>

        <Modal isOpen={isOpen} onClose={onClose} isCentered >
          <ModalOverlay 
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
          />
          <ModalContent maxW="50vw">
            <Flex direction="column">
              <ModalHeader textAlign="center" color='teal' fontSize='3xl'>Select the diagram type for your selection</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <VStack mt={3}>
                <HStack spacing={4} className="w-full">
                  <DiagramTypeCard content="Sequence Diagram" imageLink="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"/>
                  <DiagramTypeCard content="Flowchart" imageLink="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"/>
                  <DiagramTypeCard content="ER Diagram" imageLink="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"/>
                </HStack>

                <Box mt={4} className="w-full">
                  <Button className="w-full">I want to use a different type of diagram</Button>
                </Box>

                <Box mt={4} className="w-full" >
                  <Button className="w-full" colorScheme='teal' size='lg'>Submit</Button>
                </Box>
                </VStack>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme='teal' mr={3} onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </Flex>
          </ModalContent>
        </Modal>
    </>
  )
}

export default DiagramType;