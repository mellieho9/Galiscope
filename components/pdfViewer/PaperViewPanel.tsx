import { SelectionType } from "react-pdf-selection";
import {
  ArrowUturnLeftIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { ActionButton } from "@/components/pdfViewer/ActionButton";
import { BackButton } from "@/components/pdfViewer/BackButton";
import { useRouter } from "next/navigation";

interface PaperViewPanelProps {
  documentId: string;
  currentPageNumber: number;
  totalPageNumber: number;
  setSelection: (selection: SelectionType | undefined) => void;
  selection: SelectionType | undefined;
}

const PaperViewPanel = ({
  documentId,
  currentPageNumber,
  totalPageNumber,
  setSelection,
  selection
}: PaperViewPanelProps) => {
  const router = useRouter();

  const handleConfirm = () => {
    if (!selection) {
      alert("Please select a text first");
      return;
    }
    // TODO: create new diagram and navigate to dual view of that diagram
    router.push(`/dualView/${documentId}`)
    setSelection(undefined);
  }

  const handleCancel = () => {
    setSelection(undefined);
  }

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
            onClick={handleCancel}
            text={"Cancel"}
            icon={<ArrowUturnLeftIcon />}
          />
          <ActionButton
            isOutlined={true}
            onClick={handleConfirm}
            text={"Confirm"}
            icon={<CheckIcon />}
          />
        </div>
        <span>
          {currentPageNumber} out of {totalPageNumber}
        </span>
      </div>
    </>
  );
};

export default PaperViewPanel;
