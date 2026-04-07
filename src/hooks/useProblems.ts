import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/apiClient";

export function useProblems() {
  return useQuery({
    queryKey: ["problems"],
    queryFn: async () => {
      const res = await api.get("/problems");
      return res.data.problems as any[];
    },
  });
}

export function useSetProblemStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: "solved" | "attempted" | "unsolved" }) => {
      const res = await api.patch(`/problems/${id}/status`, { status });
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["problems"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

