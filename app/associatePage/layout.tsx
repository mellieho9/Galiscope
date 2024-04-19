'use client';

import { AssociateBarView } from "@/components/dual_view/AssociateBarView";
import { BackButton } from "@/components/BackButton";
import { BlurPaperView } from "@/components/dual_view/BlurPaperView";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}
) {
  return (
    <div className="w-full min-h-screen bg-white">
      <span className="absolute top-5 left-6 z-50">
        <BackButton />
      </span>
      <div className="w-full flex flex-row z-0">
        {/* blur paper view */}
        <div className="w-1/2">
          <BlurPaperView />
        </div>
        {/* diagram view */}
        <div className="w-1/2">
          <AssociateBarView paperTitle={"VideoXum: Cross-modal Visual and Textural Summarization of Videos"}/>
        </div>
      </div>
    </div>
  );
}
