import { CreateUMLDiagramParams } from "@/types/uml-diagram";
import DbService from "../db.service";

const UMLDiagramService = new DbService("uml-diagram");

const getUMLDiagramById = async (id: string) => {
  const response = await UMLDiagramService
    .select()
    .eq("id", id)
    .single();

  return response?.data;
}

const getUMLDiagramsByDocumentId = async (documentId: string) => {
  const response = await UMLDiagramService
    .select()
    .eq("document_id", documentId);

  return response?.data;
}

const createUMLDiagram = async ({
  name,
  uml_code,
  summary,
  original_text,
  document_id,
  filepath,
}: CreateUMLDiagramParams) => {
  const response = await UMLDiagramService.create({
    name,
    uml_code,
    summary,
    original_text,
    document_id,
    filepath,
  });

  return response?.data?.[0];
};

const updateUMLDiagram = async (umlDiagramData: any) => {
  const { data } = await UMLDiagramService.update({ id: umlDiagramData.id }, umlDiagramData);

  return data && data[0];
}

export default Object.assign(UMLDiagramService, {
  getUMLDiagramById,
  getUMLDiagramsByDocumentId,
  createUMLDiagram,
  updateUMLDiagram,
});