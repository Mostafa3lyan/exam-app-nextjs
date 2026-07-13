import { api } from "@/api";
import { PaginatedResponse } from "@/lib/types/diplomas";
import { Exam } from "@/lib/types/exams";
import { getMyToken } from "@/lib/utility/manage-token";


export const examService = {
  getByDiploma: (diplomaId: string, page: number, search?: string) =>
    api<PaginatedResponse<Exam>>("/api/exams", {
      params: { diplomaId, page, limit: 12, search },
    }),

  getById: async (id: string) => {
    const token = await getMyToken();

    const res = await fetch(`${process.env.API}/exams/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.accessToken}`,
      },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data?.message ?? "Failed to fetch exam");
    return data;
  },
};