import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api.client";

export interface EHRRecord {
  id: string;
  ehrId: string;
  patientId: string;
  diagnosis: string;
  prescription: string | null;
  notes: string | null;
  vitals: string | null;
  doctorName: string;
  visitDate: string;
  patient?: {
    name: string;
    patientId: string;
  };
}

export const useEhrRecords = (filters?: { patientId?: string }) => {
  return useQuery<EHRRecord[]>({
    queryKey: ["ehr", filters],
    queryFn: async () => {
      const response = await api.get("/ehr", { params: filters });
      return response.data.data;
    },
  });
};

export const useEhrById = (id: string) => {
  return useQuery<EHRRecord>({
    queryKey: ["ehr", id],
    queryFn: async () => {
      const response = await api.get(`/ehr/${id}`);
      return response.data.data;
    },
    enabled: !!id,
  });
};

export const useCreateEhrRecord = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<EHRRecord>) => {
      const response = await api.post("/ehr", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ehr"] });
    },
  });
};

export const useUpdateEhrRecord = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...data }: Partial<EHRRecord> & { id: string }) => {
      const response = await api.patch(`/ehr/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ehr"] });
    },
  });
};

export const useDeleteEhrRecord = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/ehr/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ehr"] });
    },
  });
};
