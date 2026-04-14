import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api.client";

export interface LaboratoryTest {
  id: string;
  testId: string;
  name: string;
  type: string;
  time: string;
  status: string;
  price: string;
  createdAt: string;
  updatedAt: string;
}

// Fetch all laboratory tests
export const useLabTests = () => {
  return useQuery<LaboratoryTest[]>({
    queryKey: ["labTests"],
    queryFn: async () => {
      const response = await api.get("/lab");
      return response.data.data;
    },
  });
};

// Create a new laboratory test
export const useCreateLabTest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newTest: Partial<LaboratoryTest>) => {
      const response = await api.post("/lab", newTest);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["labTests"] });
    },
  });
};

// Update a laboratory test
export const useUpdateLabTest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...data }: Partial<LaboratoryTest> & { id: string }) => {
      const response = await api.patch(`/lab/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["labTests"] });
    },
  });
};

// Decommission a laboratory test
export const useDeleteLabTest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/lab/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["labTests"] });
    },
  });
};
