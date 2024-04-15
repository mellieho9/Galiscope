"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  NormalizedSelection,
  SelectionType,
  PageDimensions,
} from "react-pdf-selection";
import { Spinner, Button } from "@chakra-ui/react";

const PdfViewer = dynamic(
  () => import("react-pdf-selection").then((mod) => mod.PdfViewer),
  { ssr: false }
);

export function PaperView() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1.2);
  const [selection, setSelection] = useState<NormalizedSelection | undefined>();
  const [areaSelectionActive, setAreaSelectionActive] = useState(false);
  const [selected, setSelected] = useState<SelectionType | undefined>(
    undefined
  );
  const [numPage, setNumPage] = useState<number>(1);
  const paperUrl = "https://arxiv.org/pdf/1708.08021.pdf";

  const handleClick = () => {
    if (!selected) {
      setSelected(mockSelection);
      const pdfViewwerContainer = document.getElementById(
        "pdf-viewer-container"
      );
      console.log(pdfViewwerContainer);
      pdfViewwerContainer?.scrollTo({
        top:
          pdfViewwerContainer.scrollHeight *
          ((mockSelection.position.pageNumber - 1) / numPage +
            mockSelection.position.boundingRect.top / numPage / 100),
        behavior: "smooth",
      });
    } else {
      setSelected(undefined);
    }
  };

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

  const mockSelection: SelectionType = {
    text: " At the same time, we do not focus on reflection and legacy patterns that appear in a relatively small fraction (that is also usually stable and well-tested). Today, tools like Babel convert modern JavaScript to (the more low-level) ES5 executed on browsers. Flow focuses on analyzing the source, instead of the target, of such translations (unlike many previous efforts that address ES5, or the even more low-level, and therefore harder, ES3).",
    position: {
      pageNumber: 2,
      boundingRect: {
        left: 14.57568463964007,
        top: 30.862021524398052,
        right: 91.40146505292802,
        bottom: 39.49453385149846,
      },
      rects: [
        {
          left: 14.57568463964007,
          top: 30.862021524398052,
          right: 31.899225055222995,
          bottom: 32.829234639152155,
        },
        {
          left: 32.37249778271305,
          top: 31.62841546730917,
          right: 91.40146505292802,
          bottom: 32.984973094502436,
        },
        {
          left: 14.57568463964007,
          top: 32.97950869700948,
          right: 91.34639147007918,
          bottom: 34.39207608582544,
        },
        {
          left: 14.57568463964007,
          top: 34.64207633596952,
          right: 91.34639147007918,
          bottom: 36.054644975505894,
        },
        {
          left: 14.57568463964007,
          top: 36.28688624647797,
          right: 91.34639147007918,
          bottom: 37.64344387367124,
        },
        {
          left: 14.57568463964007,
          top: 37.527320736744365,
          right: 75.45491735675489,
          bottom: 39.49453385149846,
        },
      ],
    },
  };

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
      <div
        id="pdf-viewer-container"
        style={{ width: "100%", boxShadow: "none" }}
      >
        <PdfViewer
          url={paperUrl}
          scale={scale}
          enableAreaSelection={enableAreaSelection}
          selections={selected ? [selected] : []}
          onTextSelection={setAndLogSelection}
          onAreaSelection={setAndLogSelection}
          onLoad={(dim) => {
            adjustScaleToFit;
            setNumPage(dim.size);
          }}
          overscanCount={2}
        />
        <Button onClick={handleClick}>Select text</Button>
      </div>
    </div>
  );
}
