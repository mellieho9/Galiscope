"use client";

import PaperView from "@/components/pdfViewer/PaperView";
import { useCallback, useEffect, useRef, useState } from "react";
import { SelectionType } from "react-pdf-selection";
import {
  ArrowLeftIcon,
  ArrowUturnLeftIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [totalPageNumber, setTotalPageNumber] = useState(0);
  //TODO: AFTER THE USER PRESS THE CONFIRM BUTTON IN THE PARENT COMPONENT, SEND SELECTION TO THE BACKEND
  const [selection, setSelection] = useState<SelectionType | undefined>();
  return (
    <div className="w-full bg-gray-50 flex flex-col items-center overflow-y-hidden overscroll-none">
      <div className="sticky top-0 flex flex-row p-4 justify-between w-full bg-teal">
        <button className="flex hover:opacity-75 items-center">
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          <span className="text-xs">Back</span>
        </button>

        <span className="font-semibold">
          Select the text you want to understand better
        </span>

        <div className="flex">
          <button
            onClick={() => setSelection(undefined)}
            className="flex hover:opacity-75 items-center mr-3"
          >
            <ArrowUturnLeftIcon className="w-4 h-4 mr-2" />
            <span className="text-xs">Cancel</span>
          </button>
          <button
            onClick={() => {
              !selection && alert("Please select a text first");
            }}
            className="flex items-center rounded-full outline hover:opacity-75 outline-offset-2"
          >
            <CheckIcon className="w-4 h-4 mr-2" />
            <span className="text-xs">Confirm</span>
          </button>
        </div>
        <span className="text-xs">
          {currentPageNumber} out of {totalPageNumber}
        </span>
      </div>
      <div className="w-2/3">
        <PaperView
          currentPageNumber={currentPageNumber}
          setCurrentPageNumber={setCurrentPageNumber}
          setTotalPageNumber={setTotalPageNumber}
          totalPageNumber={totalPageNumber}
          selection={selection}
          setSelection={setSelection}
        />
      </div>
    </div>
  );
}
