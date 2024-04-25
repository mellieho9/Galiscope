"use client";
import React, { useState, useRef } from "react";
import {
  ChatBubbleOvalLeftIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import { ModalItem } from "./ModalItem";
import { Chatbot } from "../Chatbot";
import { ExportOptions } from "../ExportOptions";

export const BottomModal = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null); // New state to track selected item
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleItemClick = (itemName: string) => {
    setSelectedItem(selectedItem === itemName ? null : itemName);
  };

  return (
    <div className="flex items-center flex-row py-1 px-5 rounded-full shadow bg-teal space-x-2">
      <ModalItem
        title={"Chat"}
        icon={<ChatBubbleOvalLeftIcon />}
        onClick={() => handleItemClick("Chat")}
        selected={selectedItem === "Chat"} // Pass selected prop
      />
      <ExportOptions />
      <ModalItem
        title={"Save"}
        icon={<CheckCircleIcon />}
        onClick={() => handleItemClick("Save")}
        selected={selectedItem === "Save"} // Pass selected prop
      />
      <Chatbot
        isOpen={selectedItem === "Chat"}
        onClose={() => setSelectedItem(null)}
        btnRef={btnRef}
      />
    </div>
  );
};
