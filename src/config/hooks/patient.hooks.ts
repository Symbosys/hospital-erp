import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api.client";

export interface Patient {
  id: string;
  patientId: string;
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
  phone: string;
  address: string | null;
  condition: string;
  ward: string | null;
  admittedOn: string | null;
  dischargedOn: string | null;
  status: "Inpatient" | "Outpatient" | "Discharged";
  createdAt: string;
  updatedAt: string;
}

export const usePatients = (filters?: { status?: string; ward?: string }) => {
  return useQuery<Patient[]>({
    queryKey: ["patients", filters],
    queryFn: async () => {
      const response = await api.get("/patients", { params: filters });
      return response.data.data;
    },
  });
};

export const usePatientById = (id: string) => {
  return useQuery<Patient>({
    queryKey: ["patients", id],
    queryFn: async () => {
      const response = await api.get(`/patients/${id}`);
      return response.data.data;
    },
    enabled: !!id,
  });
};

export const useCreatePatient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<Patient>) => {
      const response = await api.post("/patients", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });
};

export const useUpdatePatient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...data }: Partial<Patient> & { id: string }) => {
      const response = await api.patch(`/patients/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });
};

export const useDeletePatient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/patients/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });
};
