import {Box, InputGroup, InputRightElement, Input, IconButton, Text, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Flex} from '@chakra-ui/react'
import {DocumentArrowUpIcon} from "@heroicons/react/24/outline"
const PaperUpload = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
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
              <ModalHeader textAlign="center" color='teal' fontSize='3xl' >Upload the paper you want to read</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-200">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 font-semibold">Drag and drop a file</p>
                      </div>
                      <input id="dropzone-file" type="file" className="hidden" />
                  </label>
                </div>
                
                <Box mt={4} >
                  <Text color='gray' fontSize='xl' as='b'>OR</Text>
                </Box>
            

                <InputGroup size='md' mt={4}>
                  <Input
                    color='black'
                    focusBorderColor='teal'
                    pr='4.5rem'
                    placeholder='Insert link from the web'
                  />
                  <InputRightElement width='4.5rem'>
                    <IconButton
                      variant='ghost'
                      aria-label='Call Segun'
                      h='1.75rem' size='sm'
                      icon={<DocumentArrowUpIcon />}
                    />
                  </InputRightElement>
                </InputGroup>
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

export default PaperUpload;