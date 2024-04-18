"use client";
import { useState } from "react";

export function TopModal() {
  const [inputValue, setInputValue] = useState("Dataset reannotation process");
  const widthPerChar = 7.5;
  const [width, setWidth] = useState(inputValue.trim().length * widthPerChar);

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      setWidth(Math.min(width, inputValue.trim().length * widthPerChar));
    }
  }

  return (
    <div className="text-sm text-white flex flex-row bg-gray-700 p-2 px-5 shadow place-items-center rounded-full">
      <div className="flex flex-row items-center opacity-80">
        Dataset curation
        <div className="mx-2 opacity-60 font-light text-md">/</div>
      </div>
      <div className="font-semibold">
        <input
          type="text"
          placeholder="Add new topic"
          className="bg-transparent border-none focus:outline-none"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ width: `${width}px` }}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}
