import {
  Box,
  HStack,
  VStack,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Flex,
} from '@chakra-ui/react';
import CustomButton from '@/components/Button';
import { DiagramTypeCard } from '@/components/modals/DiagramTypeCard';
import {
  SelectionType,
  TextSelectionType,
} from 'react-pdf-selection';
import {
  base64ToFile,
  diagramDictionary,
} from '@/utils/helpers/helpers';
import { useEffect, useState } from 'react';
import { useGenerateDiagram } from '@/hooks/gemini.hooks';
import { useCreateUml } from '@/hooks/uml.hooks';
import { useUploadImageFile } from '@/hooks/file.hook';
import { useCreateChatHistory } from '@/hooks/chat-history.hooks';
import { Content } from '@google/generative-ai';
import { useRouter } from 'next/navigation';

interface DiagramTypeProps {
  documentId: string;
  selection: TextSelectionType | undefined;
  summary: string;
  recommendedDiagrams: string[];
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const DiagramType = ({
  documentId,
  selection,
  summary,
  recommendedDiagrams,
  isOpen,
  onOpen,
  onClose,
}: DiagramTypeProps) => {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<string>('');
  const [name, setName] = useState<string>('');

  const {
    mutate: generateDiagram,
    isPending: generatingDiagram,
  } = useGenerateDiagram();
  const {
    mutate: uploadImage,
    isPending: uploadingImage,
  } = useUploadImageFile();
  const {
    mutate: createChatHistory,
    isPending: creatingChatHistory,
  } = useCreateChatHistory();
  const {
    mutate: createUmlDiagram,
    isPending: creatingUmlDiagram,
  } = useCreateUml();

  useEffect(() => {
    if (summary.length > 0 && recommendedDiagrams.length > 0) {
      onOpen();
    }
  }, [summary, recommendedDiagrams]);

  // TODO: refactor this
  const handleSubmit = async () => {
    if (!selectedType || !name || !selection) {
      // TODO: change this to use Chakra Toast
      alert('Please select a diagram type and give it a name.');
      return;
    }

    await generateDiagram(
      { diagramType: selectedType, text: selection.text },
      {
        onSuccess: async (data) => {
          const { image, umlCode } = data;
          const imageFile = base64ToFile(image, `${name}.png`);
          await uploadImage(
            { document_id: documentId, file: imageFile },
            {
              onSuccess: async (data) => {
                const { filepath } = data;
                const chatHistory: Content[] = [
                  {
                    role: 'user',
                    parts: [
                      {
                        text: `Given the text, you are an assistant that can explain or answer any questions regarding the content of the text.\nText: ${selection.text}`,
                      },
                    ],
                  },
                  {
                    role: 'model',
                    parts: [
                      {
                        text: `Hello! I am happy to help. Please ask me any questions about the text.`,
                      },
                    ],
                  },
                ];

                await createChatHistory(
                  { history: chatHistory },
                  {
                    onSuccess: async (data) => {
                      const { id } = data;
                      console.log('chat history id', id);
                      await createUmlDiagram(
                        {
                          name,
                          type: selectedType,
                          uml_code: umlCode,
                          summary,
                          original_text: selection as SelectionType,
                          document_id: documentId,
                          chat_history_id: id,
                          filepath,
                        },
                        {
                          onSuccess: (data) => {
                            router.push(`/dualView/${data.id}`);
                          },
                          onError: (error) => {
                            // TODO: handle error
                            console.log('error', error);
                          },
                        }
                      );
                    },
                    onError: (error) => {
                      // TODO: handle error
                      console.log('error', error);
                    },
                  }
                );
              },
              onError: (error) => {
                console.log('error', error);
              },
            }
          );
        },
        onError: (error) => {
          console.log('error', error);
        },
      }
    );
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent maxW="50vw">
          <Flex direction="column">
            <ModalHeader textAlign="center" color="teal" fontSize="xl">
              Select the diagram type for your selection
            </ModalHeader>
            <ModalBody pb={6}>
              <VStack mt={3}>
                <HStack className="w-full justify-between">
                  {recommendedDiagrams.map((diagram) => (
                    <DiagramTypeCard
                      key={diagram}
                      content={diagram}
                      selectedType={selectedType}
                      setSelectedType={setSelectedType}
                      imageLink={diagramDictionary[diagram]}
                    />
                  ))}
                </HStack>

                <Box mt={4} className="w-full spac">
                  <Input
                    focusBorderColor="teal.500"
                    className="w-full text-gray-500"
                    value={selectedType}
                    placeholder="I want to use a different type of diagram"
                    _placeholder={{ textAlign: "center" }}
                    borderRadius={"lg"}
                    onChange={(e) => setSelectedType(e.target.value)}
                  />
                  <Input
                    focusBorderColor="teal.500"
                    className="w-full text-gray-500 mt-2"
                    value={name}
                    placeholder="Enter name of the diagram"
                    _placeholder={{ textAlign: "center" }}
                    borderRadius={"lg"}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Box>

                <Box mt={4} className="w-full">
                  <CustomButton
                    isLoading={
                      generatingDiagram ||
                      uploadingImage ||
                      creatingChatHistory ||
                      creatingUmlDiagram
                    }
                    className="w-full"
                    colorScheme="teal"
                    size="lg"
                    isDisabled={
                      generatingDiagram ||
                      uploadingImage ||
                      creatingChatHistory ||
                      creatingUmlDiagram
                    }
                    onClick={handleSubmit}
                  >
                    Submit
                  </CustomButton>
                </Box>
              </VStack>
            </ModalBody>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DiagramType;
