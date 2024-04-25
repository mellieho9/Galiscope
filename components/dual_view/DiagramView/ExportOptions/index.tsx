"use client";
import React, { useState } from "react";
import { ExportButton } from "./ExportButton";
import { ModalItem } from "../BottomModal/ModalItem";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";

export const ExportOptions = () => {
  const [showExportOptions, setShowExportOptions] = useState(false);
  const toggleExportOptions = () => setShowExportOptions(!showExportOptions);

  return (
    <div
      className={`flex flex-row flex items-center justify-start p-1 px-3 rounded-full ${
        showExportOptions ? "bg-white" : "bg-transparent"
      }`}
    >
      <ModalItem
        title={"Export"}
        icon={<ArrowDownTrayIcon />}
        onClick={toggleExportOptions}
        selected={showExportOptions}
      />
      {showExportOptions && (
        <div className="flex text-sm  flex-col ">
          <h1 className="text-teal font-medium">Export as...</h1>
          <div className="flex flex-row space-x-1">
            <ExportButton>SVG</ExportButton>
            <ExportButton>PDF</ExportButton>
            <ExportButton>UML</ExportButton>
          </div>
        </div>
      )}
    </div>
  );
};
