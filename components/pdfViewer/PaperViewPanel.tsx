import PaperView from "@/components/pdfViewer/PaperView";
import { useState } from "react";
import { SelectionType } from "react-pdf-selection";
import {
  ArrowLeftIcon,
  ArrowUturnLeftIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { ActionButton } from "@/components/pdfViewer/ActionButton";
import { BackButton } from "@/components/pdfViewer/BackButton";

const PaperViewPanel = () => {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [totalPageNumber, setTotalPageNumber] = useState(0);
  //TODO: AFTER THE USER PRESS THE CONFIRM BUTTON IN THE PARENT COMPONENT, SEND SELECTION TO THE BACKEND
  const [selection, setSelection] = useState<SelectionType | undefined>();
  return (
    <>
      <div className="items-center sticky top-0 flex flex-row p-4 justify-between w-full bg-teal">
        <BackButton />

        <span className="text-sm font-semibold">
          Select the text you want to understand better
        </span>

        <div className="flex flex-row space-x-1">
          <ActionButton
            isOutlined={false}
            onClick={() => setSelection(undefined)}
            text={"Cancel"}
            icon={<ArrowUturnLeftIcon />}
          />
          <ActionButton
            isOutlined={true}
            onClick={() => {
              !selection && alert("Please select a text first");
            }}
            text={"Confirm"}
            icon={<CheckIcon />}
          />
        </div>
        <span>
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
    </>
  );
};

export default PaperViewPanel;
