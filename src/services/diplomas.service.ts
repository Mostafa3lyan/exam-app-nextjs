import { api } from "@/api";
import { Diploma, PaginatedResponse } from "@/lib/types/diplomas";

export const diplomaService = {
  getAll: (page: number, search?: string) =>
    api<PaginatedResponse<Diploma>>("/api/diplomas", {
      params: { page, search },
    }),

  getById: (id: string) =>
    api<Diploma>(`/api/diplomas/${id}`),
};