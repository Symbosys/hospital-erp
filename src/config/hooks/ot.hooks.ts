import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api.client";

export interface OperationTheatre {
  id: string;
  theatreId: string;
  status: "Active Surgery" | "Ready" | "Cleaning";
  doctor: string | null;
  patient: string | null;
  procedure: string | null;
  progress: number;
  equipment: string;
  createdAt: string;
  updatedAt: string;
}

// Fetch all operation theatres
export const useOperationTheatres = () => {
  return useQuery<OperationTheatre[]>({
    queryKey: ["operationTheatres"],
    queryFn: async () => {
      const response = await api.get("/ot");
      return response.data.data;
    },
  });
};

// Create a new operation theatre
export const useCreateOperationTheatre = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newOT: Partial<OperationTheatre>) => {
      const response = await api.post("/ot", newOT);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["operationTheatres"] });
    },
  });
};

// Update an operation theatre
export const useUpdateOperationTheatre = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...data }: Partial<OperationTheatre> & { id: string }) => {
      const response = await api.patch(`/ot/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["operationTheatres"] });
    },
  });
};

// Decommission an operation theatre
export const useDeleteOperationTheatre = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/ot/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["operationTheatres"] });
    },
  });
};
