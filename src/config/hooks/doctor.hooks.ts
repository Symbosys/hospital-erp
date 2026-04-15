import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api.client";

export interface Doctor {
  id: string;
  doctorId: string;
  name: string;
  specialty: string;
  departmentId: string | null;
  phone: string;
  email: string | null;
  experience: number;
  status: "On Duty" | "Off Duty" | "On Leave";
  schedule: string | null;
  createdAt: string;
  updatedAt: string;
}

export const useDoctors = (filters?: { status?: string; specialty?: string }) => {
  return useQuery<Doctor[]>({
    queryKey: ["doctors", filters],
    queryFn: async () => {
      const response = await api.get("/doctors", { params: filters });
      return response.data.data;
    },
  });
};

export const useCreateDoctor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<Doctor>) => {
      const response = await api.post("/doctors", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
  });
};

export const useUpdateDoctor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...data }: Partial<Doctor> & { id: string }) => {
      const response = await api.patch(`/doctors/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
  });
};

export const useDeleteDoctor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/doctors/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
  });
};
