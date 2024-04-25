"use client";

import { Heading, Spinner, Text} from "@chakra-ui/react";
import { CustomAccordion } from "./CustomAccordion";
import { useGetDocumentById } from "@/hooks/document.hooks";
import CustomButton from "@/components/Button";
import { useRouter } from "next/navigation";
import { useGetUmlsByDocumentId } from "@/hooks/uml.hooks";

interface AssociateBarViewProps {
  documentId: string;
}

export interface CardProps {
  paperTitle: string;
  folder: string;
  lastUpdatedTime: string;
}

export const AssociateBarView: React.FC<AssociateBarViewProps> = ({
  documentId,
}) => {
  const router = useRouter();
  const { data: document, isLoading: documentLoading } = useGetDocumentById(documentId);
  const { data: diagrams = [], isLoading: diagramsLoading } = useGetUmlsByDocumentId(documentId);

  if (documentLoading || diagramsLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-10 pb-5 border-b border-gray-200 text-gray-800">
        <Spinner />
      </div>
    );
  }

  if (!document) {
    return (
      <div className="w-full p-10 min-h-screen space-y-4 bg-white text-gray-800">
        <h1 className="text-xl font-bold">Document not found</h1>
        <Text fontSize="sm" mb={6}>
          Oops! The document you are looking for does not exist.
        </Text>
        <CustomButton size="3xs" onClick={() => router.push("/dashboard")}>
          Go Home
        </CustomButton>
      </div>
    );
  }

  return (
    <div className="w-full p-10 min-h-screen space-y-4 bg-white">
      <Heading className="mb-10" fontSize="xl" color="teal">
        {document.title}
      </Heading>
      <Heading className="mb-3" fontSize="md" color="black">
        Diagrams generated
      </Heading>
      <CustomAccordion sectionTitle="Diagrams" diagrams={diagrams} />
    </div>
  );
};
