import { NextRequest, NextResponse } from "next/server";
import { getTesseractOutput } from "@/services/tesseract/tesseract.service";
import axios from "axios";

function detectSyntaxError(text: string) {
  // Normalize the text to lower case to make the search case-insensitive
  const normalizedText = text.toLowerCase();

  // Check if 'syntax error' is in the normalized text
  return normalizedText.includes("syntax error");
}

export async function POST(request: NextRequest) {
  try {
    // debugging purposes
    const res = await axios.post(
      "http://localhost:3000/api/gemini/create-diagram",
      {
        diagramType: "sequence",
        text: "School violence occurs when school stakeholders, not limited to students and teachers, physically or verbally attack others on the campus. This violence has many forms, ranging from students fighting students, teachers punishing students, and students verbally abusing teachers, and these incidents are at an alarming rate worldwide. After conducting a survey of 96 countries and territories in 2019, The United Nations Educational, Scientific and Cultural Organization (UNESCO) delineate that nearly 30% of children are liable to one act of violence every month and 11.2% of them experienced sexual jokes, comments, or gestures (UNESCO, 2019). In South Korea, at least once did teachers inflict their acts of emotional maltreatment on students—with the number of approximately 20%—in the form of mockery or humiliation (Cheung et al., 2019). Meanwhile, 80% of American teachers encountered at least one of the 11 different acts of violence on campuses during their previous school years (Yang et al., 2021). More seriously, the prevalence of physical fighting among 68 low-to-middle-income countries is more than 36% and serious injuries account for nearly 43% (Han et al., 2019).",
      },
      { responseType: "arraybuffer" }
    );
    // TODO: we can also do const { arrayBuffer } = await request.json();
    const arrayBuffer: Buffer = res.data;
    console.log("i am receiving", arrayBuffer);
    const text = await getTesseractOutput(arrayBuffer);
    if (detectSyntaxError(text)) {
      return new NextResponse(
        JSON.stringify({ error: "Syntax error detected" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      return new NextResponse(JSON.stringify({ text }), {
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
