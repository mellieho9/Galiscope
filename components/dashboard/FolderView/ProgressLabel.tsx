import {
  ClipboardDocumentCheckIcon,
  ClipboardIcon,
} from "@heroicons/react/24/solid";
import React from "react";

interface ProgressLabelProps {
  metric: number;
  label: string;
}

export const ProgressLabel: React.FC<ProgressLabelProps> = ({
  metric,
  label,
}) => {
  const Icon = label === "to read" ? ClipboardIcon : ClipboardDocumentCheckIcon;
  const color = label === "to read" ? "text-orange" : "text-teal";
  return (
    <div className={`flex items-center flex-row space-x-1 ${color}`}>
      <span className="w-4 h-4">
        <Icon />
      </span>
      <p className="text-sm font-medium">
        {metric} {label}
      </p>
    </div>
  );
};
