import { api } from "@/api";
import { PaginatedResponse } from "@/lib/types/diplomas";
import { Exam } from "@/lib/types/exams";


export const examService = {
  getByDiploma: (diplomaId: string, page: number, search?: string) =>
    api<PaginatedResponse<Exam>>("/api/exams", {
      params: { diplomaId, page, limit: 12, search },
    }),

  getById: (id: string) =>
    api<Exam>(`/api/exams/${id}`),
};