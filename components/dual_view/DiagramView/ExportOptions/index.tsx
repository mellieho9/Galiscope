import React, { useState } from "react";
import axios from "axios";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";

import { ExportButton } from "./ExportButton";
import { ModalItem } from "../BottomModal/ModalItem";
import { download } from "@/utils/helpers/helpers";

interface ExportOptionsProps {
  imageUrl: string;
  umlCode: string;
}

export const ExportOptions = ({ imageUrl, umlCode }: ExportOptionsProps) => {
  const [showExportOptions, setShowExportOptions] = useState(false);
  const toggleExportOptions = () => setShowExportOptions(!showExportOptions);
  const [exporting, setExporting] = useState<boolean>(false);

  const handleExport = async (type: string) => {
    setExporting(true);
    try {
      let content, filename;

      if (type === "UML") {
        content = new Blob([umlCode], { type: "text/plain" });
        filename = "diagram.uml";
      } else {
        const response = await axios.get(imageUrl, { responseType: "blob" });
        content = response.data;
        filename = `${
          imageUrl.split("/").pop()?.split(".")[0] ?? "diagram"
        }.${type.toLowerCase()}`;
      }

      const url = URL.createObjectURL(content);
      download(filename, url);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(`Error downloading the ${type}:`, error);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div
      className={`flex flex-row items-center justify-start p-1 px-3 rounded-full ${
        showExportOptions ? "bg-white" : ""
      }`}
    >
      <ModalItem
        title="Export"
        selected={showExportOptions}
        icon={<ArrowDownTrayIcon />}
        onClick={toggleExportOptions}
      />
      {showExportOptions && (
        <div className="flex flex-col text-sm">
          <h1 className="text-teal font-medium">Export as...</h1>
          <div className="flex flex-row space-x-1">
            <ExportButton onClick={() => handleExport("SVG")}>SVG</ExportButton>
            <ExportButton onClick={() => handleExport("JPEG")}>PDF</ExportButton>
            <ExportButton onClick={() => handleExport("UML")}>UML</ExportButton>
          </div>
        </div>
      )}
    </div>
  );
};
