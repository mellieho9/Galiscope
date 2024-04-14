"use client"
import { useState } from "react";
import {
  HStack,
  VStack,
  Text,
  IconButton,
  Button,
  Box,
  Flex,
} from "@chakra-ui/react";
import { ArrowDownTrayIcon, CheckCircleIcon, PencilIcon, SpeakerWaveIcon } from "@heroicons/react/24/solid";
import { ModalItem } from "./ModalItem";

export const BottomModal = () => {
  const [showExportOptions, setShowExportOptions] = useState(false);
  const toggleExportOptions = () => setShowExportOptions(!showExportOptions);

  return (
    <div className="flex flex-row py-1 px-5 rounded-full shadow bg-teal space-x-2">
        <ModalItem title={"Explain"} icon={<SpeakerWaveIcon />} />
        <ModalItem title={"Edit"} icon={<PencilIcon />} />
        <ModalItem title={"Export"} icon={<ArrowDownTrayIcon />} />
        <ModalItem title={"Save"} icon={<CheckCircleIcon />} />
    </div>
  );
};

