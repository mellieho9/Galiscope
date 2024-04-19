import { uploadFile } from "@/services/storage.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const document_id = formData.get("document_id") as string;
    const files = formData.getAll("files") as File[];

    const imageToUpload = files[0];

    const allowedTypes = new Set(["image/png", "image/jpeg", "image/jpg", "image/gif"]);

    if (!(allowedTypes.has(imageToUpload.type))) {
      return NextResponse.json({ error: "Invalid file type. Please upload an image file." }, { status: 400 });
    }

    const filepath = `${document_id}/${imageToUpload.name}`;

    const response = await uploadFile({
      bucket: "diagram-images",
      file: imageToUpload,
      path: filepath,
      fileOptions: { contentType: imageToUpload.type },
    });

    if (response.error) {
      return NextResponse.json({ error: response.error }, { status: 500 });
    }

    return NextResponse.json({ filepath: `diagram-images/${filepath}` }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
