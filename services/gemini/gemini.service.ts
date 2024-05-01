import { diagram_history, recommend_diagrams_history, summary_history } from '@/utils/gemini/finetune';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { sendQuestion } from '.';
import { GeminiMessage } from '@/types/gemini.types';
import { NextResponse } from 'next/server';

export const createTextSummary = async (input: string) => {
  const history = summary_history;
  const genAI = new GoogleGenerativeAI(
    process.env.NEXT_PUBLIC_GEMINI_TEXT_KEY || ''
  );
  const textSummary = await sendQuestion({ input, genAI, history });

  if (!textSummary) {
    return NextResponse.json(
      { error: 'Failed to summarize text.' },
      { status: 400 }
    );
  }
  return textSummary;
};

export const recommendDiagrams = async (input: string) => {
  const history = recommend_diagrams_history;
  const genAI = new GoogleGenerativeAI(
    process.env.NEXT_PUBLIC_GEMINI_UML_KEY || ''
  );
  const recommendedDiagrams = await sendQuestion({ input, genAI, history });

  if (!recommendedDiagrams) {
    return NextResponse.json(
      { error: 'Failed to recommend diagrams.' },
      { status: 400 }
    );
  }
  return JSON.parse(recommendedDiagrams);
}

export const createUMLCode = async ({
  input,
  history = diagram_history,
}: GeminiMessage) => {
  const genAI = new GoogleGenerativeAI(
    process.env.NEXT_PUBLIC_GEMINI_UML_KEY || ''
  );

  const umlCode = await sendQuestion({ input, genAI, history });

  history.push({
    role: 'user',
    parts: [{ text: input }],
  });

  history.push({
    role: 'model',
    parts: [{ text: umlCode }],
  });

  if (!umlCode) {
    return null;
  }

  return { umlCode, history };
};

export const sendGeminiMessage = async ({ input, history }: GeminiMessage) => {
  const genAI = new GoogleGenerativeAI(
    process.env.NEXT_PUBLIC_GEMINI_UML_KEY || ''
  );
  const geminiResponse = await sendQuestion({ input, genAI, history });

  if (!geminiResponse) {
    return NextResponse.json(
      { error: 'Failed to fetch Gemini response.' },
      { status: 400 }
    );
  }
  return geminiResponse;
};
