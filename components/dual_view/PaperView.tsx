"use client"

import dynamic from 'next/dynamic';
import { useCallback, useState } from "react";
import { NormalizedSelection } from "react-pdf-selection"; // Only import types and other needed exports directly

const PdfViewer = dynamic(() => import('react-pdf-selection').then(mod => mod.PdfViewer), { ssr: false });

export function PaperView() {
    const [scale, setScale] = useState(1.2);
  const [selection, setSelection] = useState<NormalizedSelection | undefined>(); // Explicitly state that selection can be undefined
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

  // Create a memoized callback for enabling area selection
  const enableAreaSelection = useCallback(() => areaSelectionActive, [areaSelectionActive]);

  return (
    <div className="w-1/2 h-full flex justify-center items-center bg-gray-200">
        <PdfViewer 
              url={paperUrl}
              scale={scale}
              enableAreaSelection={enableAreaSelection}
              onTextSelection={setAndLogSelection}
              onAreaSelection={setAndLogSelection}
              onLoad={(dims) => console.log('Dimensions on load:', dims)} overscanCount={0}        />
    </div>
  );
}
