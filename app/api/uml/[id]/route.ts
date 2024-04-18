import umlDiagramService from "@/services/uml-diagram/uml-diagram.service"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params: { id } }: { params: { id: string } }) {
  try {
    const response = await umlDiagramService.getUMLDiagramById(id);

    if (!response) {
      return NextResponse.json({ error: 'UML diagram not found' }, { status: 404 });
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params: { id } }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const response = await umlDiagramService.updateUMLDiagram({ id, ...body });

    if (!response) {
      return NextResponse.json({ error: 'Failed to update UML diagram' }, { status: 400 });
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params: { id } }: { params: { id: string } }) {
  try {
    const response = await umlDiagramService.deleteUMLDiagram(id);

    if (!response) {
      return NextResponse.json({ error: 'Failed to delete UML diagram' }, { status: 400 });
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
