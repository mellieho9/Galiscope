"use client";

import { AssociateBarView } from "@/components/dual_view/AssociateBarView";
import { BackButton } from "@/components/BackButton";
import { BlurPaperView } from "@/components/dual_view/BlurPaperView";
import CustomButton from "@/components/Button";
import { Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const paper = null;
  const router = useRouter();
  return (
    <>
      {paper ? (
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
              <AssociateBarView
                paperTitle={
                  "VideoXum: Cross-modal Visual and Textural Summarization of Videos"
                }
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-screen flex bg-gray-50 text-gray-500 items-center justify-center p-10">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-9xl font-bold mb-6">404</h1>
            <h1 className="text-md font-bold">Paper not found</h1>
            <p className="text-sm mb-6">
              Oops! The paper you are looking for does not exist.
            </p>
            <CustomButton
              width={"2xs"}
              onClick={() => router.push("/dashboard")}
            >
              Go Home
            </CustomButton>
          </div>
        </div>
      )}
    </>
  );
}
