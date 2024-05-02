import { SelectionType } from "react-pdf-selection";

export type UMLDiagram = {
  id: string;
  name: string;
  type: string;
  uml_code: string;
  summary: string;
  original_text: SelectionType;
  document_id: string;
  chat_history_id: string;
  filepath: string;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
};

export type CreateUMLDiagramParams = {
  name: string;
  type: string;
  uml_code: string;
  summary: string;
  original_text: SelectionType;
  document_id: string;
  chat_history_id: string;
  filepath: string;
};
