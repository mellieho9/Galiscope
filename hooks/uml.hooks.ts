import { CreateUMLDiagramParams, UMLDiagram } from "@/types/uml-diagram";
import api from "@/utils/axios/axios";
import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";

export const useGetUmlById = (
  id: string,
  options?: UseQueryOptions<UMLDiagram, Error>
) => useQuery({
  queryKey: ["get-uml-by-id", id],
  queryFn: async () => {
    const { data } = await api.get<UMLDiagram>(`api/uml/${id}`);
    return data;
  },
  ...options,
});

export const useGetUmlsByDocumentId = (
  documentId: string,
  options?: UseQueryOptions<UMLDiagram[], Error>
) => useQuery({
  queryKey: ["get-umls-by-document-id", documentId],
  queryFn: async () => {
    const { data } = await api.get<UMLDiagram[]>("api/uml", { params: { documentId } });
    return data;
  },
  ...options,
});

export const useCreateUml = (
  options?: UseMutationOptions<UMLDiagram, Error, CreateUMLDiagramParams>
) => useMutation({
  mutationKey: ["create-uml"],
  mutationFn: async (values: CreateUMLDiagramParams) => {
    const { data } = await api.post<UMLDiagram>("api/uml", values);
    return data;
  },
  ...options,
});

export const useUpdateUml = (
  id: string,
  options?: UseMutationOptions<UMLDiagram, Error, CreateUMLDiagramParams>
) => useMutation({
  mutationKey: ["update-uml"],
  mutationFn: async (values: CreateUMLDiagramParams) => {
    const { data } = await api.put<UMLDiagram>(`api/uml/${id}`, values);
    return data;
  },
  ...options,
});

export const useDeleteUml = (
  options?: UseMutationOptions<UMLDiagram, Error, string>
) => useMutation({
  mutationKey: ["delete-uml"],
  mutationFn: async (id: string) => {
    const { data } = await api.delete<UMLDiagram>(`api/uml/${id}`);
    return data;
  },
  ...options,
});
