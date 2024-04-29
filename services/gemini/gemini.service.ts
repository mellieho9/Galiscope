import { diagram_history, summary_history } from '@/utils/gemini/finetune';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { sendQuestion } from '.';
import { GeminiMessage } from '@/types/gemini.types';
import { NextResponse } from 'next/server';

export const createTextSummary = async ({
  input,
  history = summary_history,
}: GeminiMessage) => {
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

export const createUMLCode = async ({
  input,
  history = diagram_history,
}: GeminiMessage) => {
  console.log('create UML Code - history', history);
  const genAI = new GoogleGenerativeAI(
    process.env.NEXT_PUBLIC_GEMINI_UML_KEY || ''
  );

  const umlCode = await sendQuestion({ input, genAI, history });

  if (!umlCode) {
    return NextResponse.json(
      { error: 'Failed to create diagram.' },
      { status: 400 }
    );
  }
  return umlCode;
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
