'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import {
  NormalizedTextSelection,
  SelectionType,
} from 'react-pdf-selection';
import PaperViewPanel from './PaperViewPanel';
import { useGetDocumentById } from '@/hooks/document.hooks';
import { useGetSignedUrl } from '@/hooks/file.hook';
import CustomButton from '../Button';
import { useRouter } from 'next/navigation';
import { Spinner } from '@chakra-ui/react';

const PdfViewer = dynamic(
  () => import('react-pdf-selection').then((mod) => mod.PdfViewer),
  { ssr: false }
);

const PaperView = ({ documentId }: { documentId: string }) => {
  const router = useRouter();

  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1.2);
  const [pageYOffsets, setPageYOffsets] = useState<number[]>([]);

  const { data: paper, isLoading } = useGetDocumentById(documentId);
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

  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [totalPageNumber, setTotalPageNumber] = useState(0);
  const [selection, setSelection] = useState<
    SelectionType | undefined
  >();

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
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
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
    window.addEventListener('resize', adjustScaleToFit);
    adjustScaleToFit();

    return () => {
      window.removeEventListener('resize', adjustScaleToFit);
    };
  }, [adjustScaleToFit]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-bottom justify-start px-6 pt-10 pb-5 border-b border-gray-200">
        <Spinner />
      </div>
    );
  }

  if (!paper) {
    return (
      <div className="w-full h-screen flex bg-gray-50 text-gray-500 items-center justify-center p-10">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-9xl font-bold mb-6">404</h1>
          <h1 className="text-md font-bold">Paper not found</h1>
          <p className="text-sm mb-6">
            Oops! The paper you are looking for does not exist.
          </p>
          <CustomButton
            width={'2xs'}
            onClick={() => router.push('/dashboard')}
          >
            Go Home
          </CustomButton>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center overflow-y-hidden overscroll-none">
      <PaperViewPanel
        documentId={documentId}
        currentPageNumber={currentPageNumber}
        totalPageNumber={totalPageNumber}
        setSelection={setSelection}
        selection={selection}
      />
      <div
        id="pdf-viewer-container"
        ref={containerRef}
        className="max-h-screen w-2/3 overflow-y-auto"
      >
        <PdfViewer
          url={paperUrl}
          scale={scale}
          onTextSelection={setAndLogSelection}
          onLoad={(dim) => {
            adjustScaleToFit;
            setTotalPageNumber(dim.size);
          }}
          onPageDimensions={(obj) => {
            setPageYOffsets(obj.pageYOffsets);
          }}
          overscanCount={2}
          textSelectionColor={'rgba(248,255,0, 0.7)'}
        />
      </div>
    </div>
  );
};

export default PaperView;
