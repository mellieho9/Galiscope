"use client";
import { useState } from "react";

interface TopModalProps {
  name: string;
}

export function TopModal({ name }: TopModalProps) {
  const widthPerChar = 7.5;
  const [width, setWidth] = useState(name.trim().length * widthPerChar);

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      setWidth(Math.min(width, name.trim().length * widthPerChar));
    }
  }

  return (
    <div className="text-sm text-white flex flex-row bg-gray-700 p-2 px-5 shadow place-items-center rounded-full">
      {/* <div className="flex flex-row items-center opacity-80">
        Dataset curation
        <div className="mx-2 opacity-60 font-light text-md">/</div>
      </div> */}
      <div className="font-semibold">
        <input
          type="text"
          placeholder="Add new topic"
          className="bg-transparent border-none focus:outline-none"
          value={name}
          style={{ width: `${width}px` }}
          readOnly
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}
