import { uploadFile } from "@/services/storage.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData =  await request.formData();
    const user_id = formData.get("user_id") as string;
    const files = formData.getAll("files") as File[];

    const documentToUpload = files[0];

    if (documentToUpload.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Invalid file type. Please upload a PDF file.' }, { status: 400 });
    }

    const filepath = `${user_id}/${documentToUpload.name}`;

    const response = await uploadFile({
      bucket: 'document-files',
      file: documentToUpload,
      path: filepath,
      fileOptions: { contentType: 'application/pdf' }
    })

    if (response.error) {
      return NextResponse.json({ error: response.error }, { status: 500 });
    }

    return NextResponse.json({ filepath }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
