// src/app/hooks/useProfile.ts
"use client";

import { useAuth } from "@/contexts/AuthContext";
import { authAPI } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

export function useProfile() {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["profile", token],
    queryFn: () => {
      if (!token) throw new Error("No token available");
      return authAPI.getProfile(token);
    },
    enabled: !!token,
  });
}
