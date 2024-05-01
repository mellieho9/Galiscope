import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import { Message } from './Message';
import { Chatbox } from './Chatbox';
import { ChatHistory } from '@/types/chat-history.types';
import { useGetChatHistoryById, useUpdateChatHistory } from '@/hooks/chat-history.hooks';
import { UMLDiagram } from '@/types/uml-diagram.types';

interface ChatbotProps {
  umlDiagram: UMLDiagram;
  isOpen: boolean;
  onClose: () => void;
  btnRef: React.RefObject<HTMLElement>;
}

export const Chatbot: React.FC<ChatbotProps> = ({
  umlDiagram,
  isOpen,
  onClose,
  btnRef,
}) => {
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const { data: chatHistory, refetch } = useGetChatHistoryById(umlDiagram.chat_history_id);

  const { mutate: updateChatHistory } = useUpdateChatHistory(
    umlDiagram.chat_history_id,
    {
      onSuccess: () => refetch(),
    }
  );

useEffect(() => {
  if (chatBoxRef.current) {
    const scrollHeight = chatBoxRef.current.scrollHeight;
    chatBoxRef.current.scrollTo({ top: scrollHeight, behavior: "smooth" });
  }
}, [chatHistory]);

  if (!chatHistory) {
    return null;
  }

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
      size="md"
    >
      <DrawerOverlay />

      <DrawerContent>
        <div ref={chatBoxRef} className="w-full h-9/10 bg-gray-50 p-6 py-4 overflow-y-scroll">
          {/* messages  */}
          <div className="flex flex-col overflow-auto space-y-2">
            {chatHistory.history.map((message, index) => {
              console.log('message', message);
              return (
                <Message
                  key={index}
                  user={message.role === 'user' ? 'You' : 'Galiscope'}
                  message={message.parts[0].text ?? ''}
                />
              );
            })}
            <div className="absolute bottom-0 left-0 w-full h-40 pointer-events-none bg-gradient-to-t from-gray-50 to-transparent"></div>
          </div>
          <Chatbox />
          {/* chat box  */}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
