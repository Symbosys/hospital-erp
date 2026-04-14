import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api.client";

export interface BloodStock {
  id: string;
  group: string;
  units: number;
  status: "Optimal" | "Low" | "Critical";
  lastStocked: string;
}

export interface PharmacyItem {
  id: string;
  itemId: string;
  name: string;
  category: string;
  stock: number;
  unit: string;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  price: string;
}

export interface Consumable {
  id: string;
  itemId: string;
  name: string;
  category: string;
  stock: number;
  status: "Optimal" | "Low" | "Critical";
}

export interface Donor {
  id: string;
  name: string;
  bloodGroup: string;
  phone: string;
  lastDonated: string | null;
  status: "Eligible" | "Deferred" | "Ineligible";
  createdAt: string;
}

// --- Blood Bank Hooks ---
export const useBloodBank = () => {
  return useQuery<BloodStock[]>({
    queryKey: ["blood-bank"],
    queryFn: async () => {
      const response = await api.get("/supply-chain/blood-bank");
      return response.data.data;
    },
  });
};

export const useUpdateBloodStock = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...data }: Partial<BloodStock> & { id: string }) => {
      const response = await api.patch(`/supply-chain/blood-bank/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blood-bank"] });
    },
  });
};

// --- Pharmacy Hooks ---
export const usePharmacy = () => {
  return useQuery<PharmacyItem[]>({
    queryKey: ["pharmacy"],
    queryFn: async () => {
      const response = await api.get("/supply-chain/pharmacy");
      return response.data.data;
    },
  });
};

export const useUpdatePharmacy = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...data }: Partial<PharmacyItem> & { id: string }) => {
      const response = await api.patch(`/supply-chain/pharmacy/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pharmacy"] });
    },
  });
};

// --- Consumables Hooks ---
export const useConsumables = () => {
  return useQuery<Consumable[]>({
    queryKey: ["consumables"],
    queryFn: async () => {
      const response = await api.get("/supply-chain/consumables");
      return response.data.data;
    },
  });
};

export const useUpdateConsumable = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...data }: Partial<Consumable> & { id: string }) => {
      const response = await api.patch(`/supply-chain/consumables/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consumables"] });
    },
  });
};

// --- Donor Hooks ---
export const useDonors = () => {
  return useQuery<Donor[]>({
    queryKey: ["donors"],
    queryFn: async () => {
      const response = await api.get("/supply-chain/donors");
      return response.data.data;
    },
  });
};

export const useCreateDonor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newDonor: Partial<Donor>) => {
      const response = await api.post("/supply-chain/donors", newDonor);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["donors"] });
    },
  });
};
