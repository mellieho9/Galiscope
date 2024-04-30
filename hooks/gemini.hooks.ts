import api from "@/utils/axios/axios";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

export const useSummarizeText = (
  options?: UseMutationOptions<string, Error, { text: string }>
) => useMutation({
  mutationKey: ["summarize-text"],
  mutationFn: async ({ text }: { text: string }) => {
    const { data } = await api.post<string>("api/gemini/summarize-text", { text });
    return data;
  },
  ...options,
});

export const useRecommendDiagrams = (
  options?: UseMutationOptions<string[], Error, { text: string }>
) => useMutation({
  mutationKey: ["recommend-diagrams"],
  mutationFn: async ({ text }: { text: string }) => {
    const { data } = await api.post<string[]>("api/gemini/recommend-diagrams", { text });
    return data;
  },
  ...options,
});

export const useGenerateDiagram = (
  options?: UseMutationOptions<{ image: string, umlCode: string }, Error, { diagramType: string, text: string }>
) => useMutation({
  mutationKey: ["generate-diagram"],
  mutationFn: async ({ diagramType, text }: { diagramType: string, text: string }) => {
    const { data } = await api.post<{ image: string, umlCode: string }>("api/gemini/create-diagram", { diagramType, text });
    return data;
  },
  ...options,
});
