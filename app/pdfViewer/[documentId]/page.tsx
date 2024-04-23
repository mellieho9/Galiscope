import PaperView from "@/components/pdfViewer/PaperView";

export default function PdfViewerPage({
  params: { documentId },
}: {
  params: { documentId: string };
}) {
  return (
    <div className="w-full max-h-screen bg-gray-50 flex flex-col items-center text-white text-xs">
      <PaperView documentId={documentId} />
    </div>
  );
}
