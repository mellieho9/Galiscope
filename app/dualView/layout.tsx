import { BackButton } from "@/components/dual_view/BackButton";
import { DiagramView } from "@/components/dual_view/DiagramView";
import { PaperView } from "@/components/dual_view/PaperView";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen">
      <span className="absolute top-5 left-10 z-50">
        <BackButton />
      </span>
      <div className="w-full flex flex-row h-full z-0">
        {/* paper view */}
        <div className="w-1/2">
          <PaperView />
        </div>
        {/* diagram view */}
        <div className="w-1/2">
          <DiagramView />
        </div>
      </div>
    </div>
  );
}
