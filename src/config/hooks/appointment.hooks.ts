import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api.client";

export interface Appointment {
  id: string;
  appointmentId: string;
  patientId: string;
  doctorId: string;
  date: string;
  timeSlot: string;
  type: "Online" | "Offline";
  status: "Scheduled" | "In-Progress" | "Waiting" | "Completed" | "Cancelled";
  notes: string | null;
  patient?: {
    name: string;
    patientId: string;
  };
  doctor?: {
    name: string;
    specialty: string;
  };
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

export const useAppointmentById = (id: string) => {
  return useQuery<Appointment>({
    queryKey: ["appointments", id],
    queryFn: async () => {
      const response = await api.get(`/appointments/${id}`);
      return response.data.data;
    },
    enabled: !!id,
  });
};

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<Appointment>) => {
      const response = await api.post("/appointments", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
};

export const useUpdateAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...data }: Partial<Appointment> & { id: string }) => {
      const response = await api.patch(`/appointments/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
};

export const useDeleteAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/appointments/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
};
