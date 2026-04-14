import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api.client";

export interface Bed {
  id: string;
  bedNumber: string;
  wardId: string;
  status: "Available" | "Occupied" | "Cleaning";
  patientId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Ward {
  id: string;
  name: string;
  departmentId: string;
  totalBeds: number;
  color: string;
  department?: { name: string };
  beds: Bed[];
  _count?: { beds: number };
}

// Fetch all wards
export const useWards = () => {
  return useQuery<Ward[]>({
    queryKey: ["wards"],
    queryFn: async () => {
      const response = await api.get("/wards");
      return response.data.data;
    },
  });
};

// Create a new ward
export const useCreateWard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newWard: Partial<Ward>) => {
      const response = await api.post("/wards", newWard);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wards"] });
    },
  });
};

// Update an existing ward
export const useUpdateWard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...data }: Partial<Ward> & { id: string }) => {
      const response = await api.patch(`/wards/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wards"] });
    },
  });
};

// Update an individual bed
export const useUpdateBed = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...data }: Partial<Bed> & { id: string }) => {
      const response = await api.patch(`/beds/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wards"] });
    },
  });
};

// Decommission a ward
export const useDeleteWard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/wards/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wards"] });
    },
  });
};
