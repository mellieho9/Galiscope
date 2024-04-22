"use client";
import { useCallback, useEffect, useRef, useState, CSSProperties } from "react";
import dynamic from "next/dynamic";
import { NormalizedTextSelection, SelectionType } from "react-pdf-selection";
import { Spinner } from "@chakra-ui/react";

const PdfViewer = dynamic(
  () => import("react-pdf-selection").then((mod) => mod.PdfViewer),
  { ssr: false }
);

interface PdfScrollingComponentProps {
  currentPageNumber: number;
  totalPageNumber: number;
  selection?: SelectionType;
  setCurrentPageNumber: (pageNumber: number) => void;
  setTotalPageNumber: (pageNumber: number) => void;
  setSelection: (selection: SelectionType | undefined) => void;
}

const PaperView: React.FC<PdfScrollingComponentProps> = ({
  currentPageNumber,
  totalPageNumber,
  selection,
  setCurrentPageNumber,
  setTotalPageNumber,
  setSelection,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1.2);
  const paperUrl = "https://arxiv.org/pdf/1708.08021.pdf";

  const [pageYOffsets, setPageYOffsets] = useState<number[]>([]);
  const [selected, setSelected] = useState<SelectionType | undefined>(
    undefined
  );

  const setAndLogSelection = useCallback(
    (highlightTip?: NormalizedTextSelection) => {
      if (
        highlightTip &&
        highlightTip.text !== undefined &&
        highlightTip.position !== undefined
      ) {
        const pageNumber: number = highlightTip.position.pageNumber;
        const selectionRects = highlightTip.position.normalized;
        const newSelection: SelectionType = {
          text: highlightTip.text,
          position: { pageNumber, ...selectionRects },
        };
        setSelection(newSelection);
      }
    },
    []
  );

  const handleClick = () => {
    if (!selected) {
      setSelected(selection);
      const pdfViewerContainer = document.getElementById(
        "pdf-viewer-container"
      );
      if (pdfViewerContainer && selection) {
        pdfViewerContainer.scrollTo({
          top:
            pdfViewerContainer.scrollHeight *
            ((selection.position.pageNumber - 1) / totalPageNumber +
              selection.position.boundingRect.top / totalPageNumber / 100),
          behavior: "smooth",
        });
      }
    } else {
      setSelected(undefined);
    }
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const scrollTop = container.scrollTop;
    let accumulatedOffset = 0;

    for (let i = 0; i < pageYOffsets.length; i++) {
      accumulatedOffset += pageYOffsets[i];
      if (scrollTop < accumulatedOffset) {
        setCurrentPageNumber(i + 1);
        return;
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [pageYOffsets]);

  const adjustScaleToFit = useCallback(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const newScale = containerWidth / 650;
      setScale(newScale);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", adjustScaleToFit);
    adjustScaleToFit();

    return () => {
      window.removeEventListener("resize", adjustScaleToFit);
    };
  }, [adjustScaleToFit]);

  return (
    <div
      id="pdf-viewer-container"
      ref={containerRef}
      className="max-h-screen w-full overflow-y-auto"
    >
      <PdfViewer
        url={paperUrl}
        scale={scale}
        selections={selected ? [selected] : []}
        onTextSelection={setAndLogSelection}
        onLoad={(dim) => {
          adjustScaleToFit;
          setTotalPageNumber(dim.size);
        }}
        onPageDimensions={(obj) => {
          setPageYOffsets(obj.pageYOffsets);
        }}
        overscanCount={2}
        textSelectionColor={"rgba(248,255,0, 0.7)"}
      />
      <button className="bg-sky-500/100" onClick={handleClick}>
        Select text
      </button>
    </div>
  );
};

export default PaperView;