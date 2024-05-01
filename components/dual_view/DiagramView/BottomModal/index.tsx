'use client';
import React, { useState, useRef } from 'react';
import {
  ChatBubbleOvalLeftIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/solid';
import { ModalItem } from './ModalItem';
import { Chatbot } from '../Chatbot';
import { ExportOptions } from '../ExportOptions';
import { UMLDiagram } from '@/types/uml-diagram.types';
import { useGetChatHistoryById, useUpdateChatHistory } from '@/hooks/chat-history.hooks';
import { updateChatHistory } from '../../../../services/chat-history/chat-history.service';
import { QueryClient } from '@tanstack/react-query';

interface BottomModalProps {
  umlDiagram: UMLDiagram | undefined;
}

export const BottomModal = ({
  umlDiagram,
}: BottomModalProps) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(
    null
  ); // New state to track selected item
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleItemClick = (itemName: string) => {
    setSelectedItem(selectedItem === itemName ? null : itemName);
  };

  if (!umlDiagram) {
    return null;
  }

  return (
    <div className="flex items-center flex-row py-1 px-5 rounded-full shadow bg-teal space-x-2">
      <ModalItem
        title={'Chat'}
        icon={<ChatBubbleOvalLeftIcon />}
        onClick={() => handleItemClick('Chat')}
        selected={selectedItem === 'Chat'} // Pass selected prop
      />
      <ExportOptions />
      <ModalItem
        title={'Save'}
        icon={<CheckCircleIcon />}
        onClick={() => handleItemClick('Save')}
        selected={selectedItem === 'Save'} // Pass selected prop
      />
      <Chatbot
        umlDiagram={umlDiagram}
        isOpen={selectedItem === 'Chat'}
        onClose={() => setSelectedItem(null)}
        btnRef={btnRef}
      />
    </div>
  );
};
