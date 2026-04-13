import { useMutation } from "@tanstack/react-query";
import api from "../api.client";
import { useAuthStore } from "../../store/authStore";

export const useLoginMutation = () => {
  const loginToStore = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: async (credentials: any) => {
      const response = await api.post("/auth/login", credentials);
      return response.data;
    },
    onSuccess: (data) => {
      loginToStore(data.profile, data.token);
    },
  });
};
