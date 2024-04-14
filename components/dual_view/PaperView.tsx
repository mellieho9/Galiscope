"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { NormalizedSelection } from "react-pdf-selection"; // Only import types and other needed exports directly
import { Spinner } from '@chakra-ui/react';

const PdfViewer = dynamic(
  () => import("react-pdf-selection").then((mod) => mod.PdfViewer),
  { ssr: false }
);

export function PaperView() {
  const [scale, setScale] = useState(1.0);
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

  return (
    <div className="max-h-screen w-full overflow-auto">
      {/* paper  */}

      <PdfViewer
        url={paperUrl}
        scale={scale}
        enableAreaSelection={enableAreaSelection}
        onTextSelection={setAndLogSelection}
        onAreaSelection={setAndLogSelection}
        onLoad={(dims) => console.log("Dimensions on load:", dims)}
        overscanCount={0}
        style={{ boxShadow: 'none' }}
      />
    </div>
  );
}
