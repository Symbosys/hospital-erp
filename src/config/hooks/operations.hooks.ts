import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api.client";

export interface BillingRecord {
  id: string;
  billId: string;
  patientId: string;
  amount: number;
  paidAmount: number;
  category: "Consultation" | "Surgery" | "Lab" | "Pharmacy" | "Room";
  status: "Pending" | "Paid" | "Partial" | "Waived";
  paymentMode: string | null;
  dueDate: string | null;
  issuedOn: string;
  updatedAt: string;
  patient?: {
    name: string;
    patientId: string;
  };
}

export const useBillingRecords = (filters?: { status?: string; category?: string; patientId?: string }) => {
  return useQuery<BillingRecord[]>({
    queryKey: ["billing", filters],
    queryFn: async () => {
      const response = await api.get("/billing", { params: filters });
      return response.data.data;
    },
  });
};

export const useBillingById = (id: string) => {
  return useQuery<BillingRecord>({
    queryKey: ["billing", id],
    queryFn: async () => {
      const response = await api.get(`/billing/${id}`);
      return response.data.data;
    },
    enabled: !!id,
  });
};

export const useCreateBilling = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<BillingRecord>) => {
      const response = await api.post("/billing", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["billing"] });
    },
  });
};

export const useUpdateBilling = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...data }: Partial<BillingRecord> & { id: string }) => {
      const response = await api.patch(`/billing/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["billing"] });
    },
  });
};

export const useDeleteBilling = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/billing/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["billing"] });
    },
  });
};
