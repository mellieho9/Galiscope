// ModalItem.tsx
import React, { useState } from "react";

type ModalItemProps = {
  title: string;
  icon: React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
};

export const ModalItem: React.FC<ModalItemProps> = ({
  title,
  icon,
  onClick,
  selected = false,
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col items-center p-2 py-2 space-y-1 text-white rounded-full hover:bg-white hover:text-teal ${selected && "bg-white"}`}
    >
      <span className={`${selected && "text-teal"} w-4 h-4`}>{icon}</span>
      {selected ? null : <p className="text-sm font-semibold">{title}</p>}{" "}
    </div>
  );
};
