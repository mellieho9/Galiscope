"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { NormalizedTextSelection } from "react-pdf-selection";
import { Spinner } from "@chakra-ui/react";

const PdfViewer = dynamic(
  () => import("react-pdf-selection").then((mod) => mod.PdfViewer),
  { ssr: false }
);

interface PdfScrollingComponentProps {
  currentPageNumber: number;
  setCurrentPageNumber: (pageNumber: number) => void;
  setTotalPageNumber: (pageNumber: number) => void;
}

const PaperView: React.FC<PdfScrollingComponentProps> = ({
  currentPageNumber,
  setCurrentPageNumber,
  setTotalPageNumber,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1.2);
  const [selection, setSelection] = useState<
    NormalizedTextSelection | undefined
  >();
  const [areaSelectionActive, setAreaSelectionActive] = useState(false);
  const paperUrl = "https://arxiv.org/pdf/1708.08021.pdf";

  const [pageYOffsets, setPageYOffsets] = useState<number[]>([]);

  const setAndLogSelection = useCallback(
    (highlightTip?: NormalizedTextSelection) => {
      console.log(highlightTip);
      console.log(highlightTip?.text);
      console.log(highlightTip?.position);
      setSelection(highlightTip);
    },
    []
  );

  const enableAreaSelection = useCallback(
    () => areaSelectionActive,
    [areaSelectionActive]
  );

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const scrollTop = container.scrollTop;
    let accumulatedOffset = 0;
    console.log(pageYOffsets);

    for (let i = 0; i < pageYOffsets.length; i++) {
      accumulatedOffset += pageYOffsets[i];
      for (let i = 0; i < pageYOffsets.length; i++) {
        if (scrollTop < pageYOffsets[i]) {
          setCurrentPageNumber(i + 1);
          break;
        }
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    // Cleanup the event listener
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [pageYOffsets]); // Only re-run if pageYOffsets changes

  const adjustScaleToFit = useCallback(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const newScale = containerWidth / 650; // Assuming 800 is the natural width of the PDF you might want to display
      setScale(newScale);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", adjustScaleToFit);
    adjustScaleToFit(); // Initial scale adjustment on mount

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
      <div style={{ width: "100%", boxShadow: "none" }}>
        <PdfViewer
          url={paperUrl}
          scale={scale}
          enableAreaSelection={enableAreaSelection}
          onTextSelection={setAndLogSelection}
          onLoad={(dim) => {
            adjustScaleToFit;
            setTotalPageNumber(dim.size);
          }}
          onPageDimensions={(obj) => {
            setPageYOffsets(obj.pageYOffsets);
          }}
          overscanCount={0}
        />
      </div>
    </div>
  );
};

export default PaperView;
