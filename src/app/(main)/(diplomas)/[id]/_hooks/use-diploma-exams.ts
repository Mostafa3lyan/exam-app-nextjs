import { diplomaService } from "@/services/diplomas.service";
import { useQuery } from "@tanstack/react-query";

export function useDiplomaExams(id: string) {
  return useQuery({
    queryKey: ["diploma", id],
    queryFn: () => diplomaService.getById(id),
    enabled: !!id,
  });
}