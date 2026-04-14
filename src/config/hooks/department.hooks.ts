import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api.client";

export interface Department {
  id: string;
  name: string;
  head: string;
  staffCount: number;
  occupancy: number;
  status: "Optimal" | "High Load" | "Critical" | "Available";
  color: string;
  createdAt: string;
  updatedAt: string;
  _count?: {
    wards: number;
  };
}

// Fetch all departments
export const useDepartments = () => {
  return useQuery<Department[]>({
    queryKey: ["departments"],
    queryFn: async () => {
      const response = await api.get("/departments");
      return response.data.data;
    },
  });
};

// Create a new department
export const useCreateDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newDept: Partial<Department>) => {
      const response = await api.post("/departments", newDept);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });
};

// Update an existing department
export const useUpdateDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...data }: Partial<Department> & { id: string }) => {
      const response = await api.patch(`/departments/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });
};

// Decommission a department
export const useDeleteDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/departments/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });
};
