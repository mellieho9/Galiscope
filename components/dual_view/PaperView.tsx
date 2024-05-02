"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  NormalizedSelection,
  SelectionType,
  PageDimensions,
  NormalizedTextSelection,
  NormalizedAreaSelection,
} from "react-pdf-selection";
import { Button, Spinner } from "@chakra-ui/react";
import { useGetUmlById } from "@/hooks/uml.hooks";
import { useGetDocumentById } from "@/hooks/document.hooks";
import { useGetSignedUrl } from "@/hooks/file.hook";

const PdfViewer = dynamic(
  () => import("react-pdf-selection").then((mod) => mod.PdfViewer),
  { ssr: false }
);

interface PaperViewProps {
  umlDiagramId: string;
}

export function PaperView({ umlDiagramId }: PaperViewProps) {
  const { data: umlDiagram, isLoading: loadingUmlDiagram  } = useGetUmlById(umlDiagramId);
  const { data: paper, isLoading: loadingPaper } = useGetDocumentById(umlDiagram?.document_id ?? "");
  const [paperUrl, setPaperUrl] = useState<string>('');

  useEffect(() => {
    const getSignedUrl = async () => {
      if (paper) {
        const signedUrl = await useGetSignedUrl(paper.filepath);
        setPaperUrl(signedUrl);
      }
    };
    getSignedUrl();
  }, [paper]);

  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1.2);
  const [selection, setSelection] = useState<NormalizedSelection | undefined>();
  const [selected, setSelected] = useState<SelectionType | undefined>(
    undefined
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [numPage, setNumPage] = useState<number>(1);
  const [pageHeights, setPageHeights] = useState<number[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (container) {
        const scrollTop = container.scrollTop;
        let accumulatedHeight = 0;

        for (let i = 0; i < pageHeights.length; i++) {
          accumulatedHeight += pageHeights[i];
          if (scrollTop < accumulatedHeight) {
            setCurrentPage(i + 1);
            break;
          }
        }
      }
    };

    // Attach scroll event listener
    const container = containerRef.current;
    container?.addEventListener("scroll", handleScroll);

    // Clean up function to remove event listener
    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, [pageHeights]); // Dependency array includes pageHeights to update the listener when pageHeights change

  const handleClick = () => {
    if (!selected) {
      setSelected(mockSelection);
      const pdfViewwerContainer = document.getElementById(
        "pdf-viewer-container"
      );
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

  const onAreaSelection = useCallback(
    (highlightTip?: NormalizedAreaSelection) => {
      console.log(highlightTip?.image);
      setSelection(highlightTip);
    },
    [setSelection]
  );

  const onTextSelection = useCallback(
    (highlightTip?: NormalizedTextSelection) => {
      console.log(highlightTip?.text);
      setSelection(highlightTip);
    },
    [setSelection]
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

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    const scrollTop = container.scrollTop;
    const pageHeights: string | any[] = []; // This should be the array of heights of each page

    let accumulatedHeight = 0;
    for (let i = 0; i < pageHeights.length; i++) {
      accumulatedHeight += pageHeights[i];
      if (scrollTop < accumulatedHeight) {
        setCurrentPage(i + 1);
        break;
      }
    }
  };

  if (loadingUmlDiagram || loadingPaper) {
    return (
      <div className="flex flex-col items-bottom justify-start px-6 pt-10 pb-5 border-b border-gray-200">
        <Spinner />
      </div>
    );
  }

  return (
    <div
      id="pdf-viewer-container"
      ref={containerRef}
      className="max-h-screen w-full overflow-y-scroll"
      onScroll={handleScroll}
    >
      <div style={{ width: "100%", boxShadow: "none" }}>
        <PdfViewer
          url={paperUrl}
          scale={scale}
          textSelectionColor="rgba(255, 222, 100, 0.3)"
          selections={selected ? [selected] : []}
          onTextSelection={onTextSelection}
          onAreaSelection={onAreaSelection}
          onLoad={(dimensions: PageDimensions) => {
            adjustScaleToFit;
            setNumPage(dimensions.size);
          }}
          onPageDimensions={({ pageDimensions, pageYOffsets }) => {
          }}
          overscanCount={2}
        />
      </div>
    </div>
  );
}
