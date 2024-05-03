import { SelectionType, TextSelectionType } from "react-pdf-selection";
import {
  ArrowUturnLeftIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { ActionButton } from "@/components/pdfViewer/ActionButton";
import { BackButton } from "@/components/pdfViewer/BackButton";
import { useRouter } from "next/navigation";
import { useCreateUml } from "@/hooks/uml.hooks";
import DiagramType from "../modals/DiagramType";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { useRecommendDiagrams, useSummarizeText } from "@/hooks/gemini.hooks";

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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [recommendedDiagrams, setRecommendedDiagrams] = useState<string[]>([]);
  const [summary, setSummary] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: summarizeTest } = useSummarizeText();
  const { mutate: recommendDiagrams } = useRecommendDiagrams();

  const handleConfirm = async () => {
    setIsLoading(true);
    if (!selection) {
      // TODO: Change this to use Chakra Toast
      alert("Please select a text first");
      return;
    }

    const selectionAsText = selection as TextSelectionType;
    await summarizeTest({ text: selectionAsText.text }, {
      onSuccess: (data) => {
        setSummary(data);
      },
      onError: (error) => {
        console.log("error", error);
      },
    });
    setIsLoading(false);
    await recommendDiagrams({ text: selectionAsText.text }, {
      onSuccess: (data) => {
        setRecommendedDiagrams(data);
      },
      onError: (error) => {
        console.log("error", error);
      },
    });
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
          isLoading={isLoading}
            isOutlined={true}
            onClick={handleConfirm}
            text={"Confirm"}
            icon={<CheckIcon />}
          />
        </div>
        <span>
          {currentPageNumber} out of {totalPageNumber}
        </span>

        <DiagramType
          documentId={documentId}
          selection={selection as TextSelectionType}
          summary={summary}
          recommendedDiagrams={recommendedDiagrams}
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
        />
      </div>
    </>
  );
};

export default PaperViewPanel;
