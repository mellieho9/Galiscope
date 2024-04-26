import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import React from "react";
import { Message } from "./Message";
import { User } from "@/types/user.types";
import { mockMessage } from "@/utils/mock";
import { Chatbox } from "./Chatbox";

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  btnRef: React.RefObject<HTMLElement>;
}

export const Chatbot: React.FC<ChatbotProps> = ({
  isOpen,
  onClose,
  btnRef,
}) => {
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
        <div className="w-full h-full bg-gray-50 p-6 py-4 overflow-y-auto">
          {/* messages  */}
          <div className="flex flex-col overflow-auto space-y-2">
            {mockMessage.map((message) => {
              return <Message user={message.user} message={message.message} />;
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
