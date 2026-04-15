import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api.client";

export interface MedicalStaff {
  id: string;
  staffId: string;
  name: string;
  role: string;
  department: string;
  phone: string;
  shift: "Morning" | "Evening" | "Night";
  status: "On Duty" | "Off Duty" | "On Leave";
  createdAt: string;
  updatedAt: string;
}

export interface NonMedicalStaff {
  id: string;
  staffId: string;
  name: string;
  designation: string;
  department: string;
  phone: string;
  shift: "Morning" | "Evening" | "Night";
  status: "Active" | "Inactive" | "On Leave";
  createdAt: string;
  updatedAt: string;
}

// Medical Staff
export const useMedicalStaff = (filters?: { status?: string; shift?: string; department?: string }) => {
  return useQuery<MedicalStaff[]>({
    queryKey: ["medical-staff", filters],
    queryFn: async () => {
      const response = await api.get("/medical-staff", { params: filters });
      return response.data.data;
    },
  });
};

export const useCreateMedicalStaff = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<MedicalStaff>) => {
      const response = await api.post("/medical-staff", data);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["medical-staff"] }),
  });
};

export const useUpdateMedicalStaff = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...data }: Partial<MedicalStaff> & { id: string }) => {
      const response = await api.patch(`/medical-staff/${id}`, data);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["medical-staff"] }),
  });
};

export const useDeleteMedicalStaff = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/medical-staff/${id}`);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["medical-staff"] }),
  });
};

// Non-Medical Staff
export const useNonMedicalStaff = (filters?: { status?: string; shift?: string; department?: string }) => {
  return useQuery<NonMedicalStaff[]>({
    queryKey: ["non-medical-staff", filters],
    queryFn: async () => {
      const response = await api.get("/non-medical-staff", { params: filters });
      return response.data.data;
    },
  });
};

export const useCreateNonMedicalStaff = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<NonMedicalStaff>) => {
      const response = await api.post("/non-medical-staff", data);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["non-medical-staff"] }),
  });
};

export const useUpdateNonMedicalStaff = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...data }: Partial<NonMedicalStaff> & { id: string }) => {
      const response = await api.patch(`/non-medical-staff/${id}`, data);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["non-medical-staff"] }),
  });
};

export const useDeleteNonMedicalStaff = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/non-medical-staff/${id}`);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["non-medical-staff"] }),
  });
};
