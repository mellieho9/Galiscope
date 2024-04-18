"use client";

import PaperView from "@/components/pdfViewer/PaperView";
import { useCallback, useEffect, useRef, useState } from "react";
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
  return (
    <>
      <div className="sticky top-0 flex flex-row p-4 justify-between w-full bg-teal">
        <button className="flex hover:bg-sky-700 items-center">
          <ArrowLeftIcon className="w-6 h-6 mr-2" />
          <span className="text-xs">Back</span>
        </button>

        <span className="font-semibold">
          Select the text you want to understand better
        </span>

        <div className="flex">
          <button className="flex hover:text-black hover:bg-sky-700 items-center mr-3">
            <ArrowUturnLeftIcon className="w-6 h-6 mr-2" />
            <span className="text-xs">Reset</span>
          </button>
          <button className="flex items-center rounded-full outline hover:text-black hover:bg-sky-700 outline-offset-2">
            <CheckIcon className="w-6 h-6 mr-2" />
            <span className="text-xs">Confirm</span>
          </button>
        </div>
        <span className="text-xs">
          {currentPageNumber} out of {totalPageNumber}
        </span>
      </div>
      <div className="flex flex-row justify-center w-full bg-gray-50">
        <div className="w-2/3">
          <PaperView
            currentPageNumber={currentPageNumber}
            setCurrentPageNumber={setCurrentPageNumber}
            setTotalPageNumber={setTotalPageNumber}
            totalPageNumber={totalPageNumber}
          />
        </div>
      </div>
    </>
  );
}
