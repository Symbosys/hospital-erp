import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api.client";

export interface BillingRecord {
  id: string;
  billId: string;
  patientId: string;
  patient?: { name: string; patientId: string };
  amount: number;
  paidAmount: number;
  category: "Consultation" | "Surgery" | "Lab" | "Pharmacy" | "Room";
  status: "Pending" | "Paid" | "Partial" | "Waived";
  paymentMode: string | null;
  issuedOn: string;
  dueDate: string | null;
  updatedAt: string;
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

export const useCreateBilling = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<BillingRecord>) => {
      const response = await api.post("/billing", data);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["billing"] }),
  });
};

export const useUpdateBilling = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...data }: Partial<BillingRecord> & { id: string }) => {
      const response = await api.patch(`/billing/${id}`, data);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["billing"] }),
  });
};

export const useDeleteBilling = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/billing/${id}`);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["billing"] }),
  });
};

export interface EHRRecord {
  id: string;
  ehrId: string;
  patientId: string;
  patient?: { name: string; patientId: string };
  diagnosis: string;
  prescription: string | null;
  notes: string | null;
  vitals: string | null;
  doctorName: string;
  visitDate: string;
  createdAt: string;
  updatedAt: string;
}

export const useEHRRecords = (filters?: { patientId?: string }) => {
  return useQuery<EHRRecord[]>({
    queryKey: ["ehr", filters],
    queryFn: async () => {
      const response = await api.get("/ehr", { params: filters });
      return response.data.data;
    },
  });
};

export const useCreateEHR = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<EHRRecord>) => {
      const response = await api.post("/ehr", data);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["ehr"] }),
  });
};

export const useUpdateEHR = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...data }: Partial<EHRRecord> & { id: string }) => {
      const response = await api.patch(`/ehr/${id}`, data);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["ehr"] }),
  });
};

export interface Appointment {
  id: string;
  appointmentId: string;
  patientId: string;
  doctorId: string;
  patient?: { name: string; patientId: string };
  doctor?: { name: string; specialty: string };
  date: string;
  timeSlot: string;
  type: "Consultation" | "Follow-up" | "Emergency" | "Procedure";
  status: "Scheduled" | "Completed" | "Cancelled" | "No-Show";
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export const useAppointments = (filters?: { status?: string; type?: string; doctorId?: string; patientId?: string }) => {
  return useQuery<Appointment[]>({
    queryKey: ["appointments", filters],
    queryFn: async () => {
      const response = await api.get("/appointments", { params: filters });
      return response.data.data;
    },
  });
};

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<Appointment>) => {
      const response = await api.post("/appointments", data);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["appointments"] }),
  });
};

export const useUpdateAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...data }: Partial<Appointment> & { id: string }) => {
      const response = await api.patch(`/appointments/${id}`, data);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["appointments"] }),
  });
};
