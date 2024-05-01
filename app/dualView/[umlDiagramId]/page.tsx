import { DiagramView } from "@/components/dual_view/DiagramView";
import { PaperView } from "@/components/dual_view/PaperView";

export default function DualViewPage({
  params: { umlDiagramId },
}: {
  params: { umlDiagramId: string };
}) {
  return (
    <div className="w-full flex flex-row z-0">
      {/* paper view */}
      <div className="w-1/2">
        <PaperView umlDiagramId={umlDiagramId} />
      </div>
      {/* diagram view */}
      <div className="w-1/2">
        <DiagramView umlDiagramId={umlDiagramId} />
      </div>
    </div>
  );
}
