"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { NormalizedSelection } from "react-pdf-selection";
import { Spinner } from "@chakra-ui/react";

const PdfViewer = dynamic(
  () => import("react-pdf-selection").then((mod) => mod.PdfViewer),
  { ssr: false }
);

export function PaperView() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1.2);
  const [selection, setSelection] = useState<NormalizedSelection | undefined>();
  const [areaSelectionActive, setAreaSelectionActive] = useState(false);
  const paperUrl = "https://arxiv.org/pdf/2303.12060.pdf";

  const setAndLogSelection = useCallback(
    (highlightTip?: NormalizedSelection) => {
      console.log(
        highlightTip
          ? `New ${"image" in highlightTip ? "area" : "text"} selection`
          : "Reset selection",
        highlightTip?.position
      );
      setSelection(highlightTip);
    },
    []
  );

  const enableAreaSelection = useCallback(
    () => areaSelectionActive,
    [areaSelectionActive]
  );

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
    <div ref={containerRef} className="max-h-screen w-full overflow-y-auto">
      <PdfViewer
        url={paperUrl}
        scale={scale}
        enableAreaSelection={enableAreaSelection}
        onTextSelection={setAndLogSelection}
        onAreaSelection={setAndLogSelection}
        onLoad={adjustScaleToFit}
        overscanCount={0}
        style={{ width: "100%", boxShadow: "none" }}
      />
    </div>
  );
}
