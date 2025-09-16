"use client";

import { useAuth } from "@/contexts/AuthContext";
import { authService } from "@/services";
import { useQuery } from "@tanstack/react-query";

export function useProfile() {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["profile", token],
    queryFn: () => {
      if (!token) throw new Error("No token available");
      return authService.getProfile(token);
    },
    enabled: !!token,
  });
}
