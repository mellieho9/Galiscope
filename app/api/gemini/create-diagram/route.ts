import {
  createTextSummary,
  createUMLCode,
} from "./../../../../services/gemini/gemini.service";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { getTextFromImage } from "@/services/tesseract/tesseract.service";

export async function POST(request: NextRequest) {
  const { diagramType, text } = await request.json();

  let input = `Type: ${diagramType}. Text: ${text}`;

  // console.log(input)
  const umlCode = await createUMLCode(input);
  // console.log('umlCode:' + umlCode)

  if (!umlCode) {
    return NextResponse.json(
      { error: "Failed to create diagram" },
      { status: 400 }
    );
  }

  let diagram = await axios.post(
    process.env.NEXT_PUBLIC_PLANTUML_SERVER_URL || "",
    { input: umlCode },
    { responseType: "arraybuffer" }
  );

  let textImg = ''
  let textArr: string[] = [];
  let length = 0
  let generateTime = 0

  do {
    textImg = await getTextFromImage(diagram.data)
    textArr = textImg.split('\n')
    length = textArr.length
    generateTime = 0
  }
  while (length >= 4 && textArr[length - 2] == "Syntax Error?" && generateTime < 3) {
    input = `Type: ${diagramType}. Text: ${textImg}`
    diagram = await axios.post(
      process.env.NEXT_PUBLIC_PLANTUML_SERVER_URL || "",
      { input: umlCode },
      { responseType: "arraybuffer" }
    );
  }

  return new NextResponse(diagram.data, {
    headers: {
      "Content-Type": "image/png",
    },
  });
}
