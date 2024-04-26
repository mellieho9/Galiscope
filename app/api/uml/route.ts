import umlDiagramService from "@/services/uml-diagram/uml-diagram.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const documentId = searchParams.get("documentId");

    if (documentId) {
      const response = await umlDiagramService.getUMLDiagramsByDocumentId(documentId);
      return NextResponse.json(response, { status: 200 });
    } else {
      return NextResponse.json({ error: "No document ID provided" }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, uml_code, summary, original_text, document_id, chat_history_id, filepath } = await request.json();
    const response = await umlDiagramService.createUMLDiagram(
      { name, uml_code, summary, original_text, document_id, chat_history_id, filepath }
    );

    if (!response) {
      return NextResponse.json({ error: "Failed to create UML diagram" }, { status: 400 });
    }

    return NextResponse.json(response, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
