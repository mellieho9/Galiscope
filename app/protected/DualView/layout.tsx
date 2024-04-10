import { BackButton } from "@/components/dual-view/BackButton";
import { DiagramView } from "@/components/dual-view/DiagramView";
import { PaperView } from "@/components/dual-view/PaperView";

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="h-full min-h-screen">
        <span className="absolute top-5 left-5 z-5">
        <BackButton  />
        </span>
        <div className="w-full flex flex-row h-full">
            {/* paper view  */}
            <PaperView />
            {/* diagram view  */}
            <DiagramView />
        </div>
      </div>
    );
  }