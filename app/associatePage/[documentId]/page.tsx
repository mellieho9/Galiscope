import { AssociateBarView } from '@/components/dual_view/AssociateBarView';
import { BlurPaperView } from '@/components/dual_view/BlurPaperView';

export default function DocumentPage({
  params: { documentId },
}: {
  params: { documentId: string };
}) {
  return (
    <div className="w-full flex flex-row z-0">
      {/* blur paper view */}
      <div className="w-1/2">
        <BlurPaperView documentId={documentId} />
      </div>
      <div className="w-1/2">
        <AssociateBarView documentId={documentId} />
      </div>
    </div>
  );
}
