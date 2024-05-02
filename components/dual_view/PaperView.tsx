'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import {
  NormalizedSelection,
  SelectionType,
  PageDimensions,
  NormalizedTextSelection,
  NormalizedAreaSelection,
} from 'react-pdf-selection';
import { Button, Spinner } from '@chakra-ui/react';
import { useGetUmlById } from '@/hooks/uml.hooks';
import { useGetDocumentById } from '@/hooks/document.hooks';
import { useGetSignedUrl } from '@/hooks/file.hook';

const PdfViewer = dynamic(
  () => import('react-pdf-selection').then((mod) => mod.PdfViewer),
  { ssr: false }
);

interface PaperViewProps {
  umlDiagramId: string;
}

export function PaperView({ umlDiagramId }: PaperViewProps) {
  const {
    data: umlDiagram,
    isLoading: loadingUmlDiagram,
  } = useGetUmlById(umlDiagramId);
  const { data: paper, isLoading: loadingPaper } = useGetDocumentById(
    umlDiagram?.document_id ?? ''
  );
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
  const [selection, setSelection] = useState<
    NormalizedSelection | undefined
  >();
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
    container?.addEventListener('scroll', handleScroll);

    // Clean up function to remove event listener
    return () => {
      container?.removeEventListener('scroll', handleScroll);
    };
  }, [pageHeights]); // Dependency array includes pageHeights to update the listener when pageHeights change

  useEffect(() => {
    const pdfViewwerContainer = document.getElementById(
      'pdf-viewer-container'
    );
    if (umlDiagram && pdfViewwerContainer) {
      console.log('In here', umlDiagram.original_text);
      pdfViewwerContainer?.scrollTo({
        top:
          pdfViewwerContainer.scrollHeight *
          ((umlDiagram.original_text.position.pageNumber - 1) / numPage +
            umlDiagram.original_text.position.boundingRect.top / numPage / 100),
        behavior: 'smooth',
      });
    }
  }, [umlDiagram, numPage]);

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

  const adjustScaleToFit = useCallback(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const newScale = containerWidth / 650; // Assuming 800 is the natural width of the PDF you might want to display
      setScale(newScale);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', adjustScaleToFit);
    adjustScaleToFit(); // Initial scale adjustment on mount

    return () => {
      window.removeEventListener('resize', adjustScaleToFit);
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
      <div style={{ width: '100%', boxShadow: 'none' }}>
        <PdfViewer
          url={paperUrl}
          scale={scale}
          textSelectionColor="rgba(255, 222, 100, 0.3)"
          selections={umlDiagram ? [umlDiagram.original_text] : []}
          onTextSelection={onTextSelection}
          onAreaSelection={onAreaSelection}
          onLoad={(dimensions: PageDimensions) => {
            adjustScaleToFit;
            setNumPage(dimensions.size);
          }}
          onPageDimensions={({ pageDimensions, pageYOffsets }) => {}}
          overscanCount={2}
        />
      </div>
    </div>
  );
}
