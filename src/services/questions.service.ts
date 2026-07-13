import { getMyToken } from "@/lib/utility/manage-token";

export const questionService = {
  getByExam: async (examId: string) => {
    const token = await getMyToken();
    const res = await fetch(
      `${process.env.API}/questions/exam/${examId}`,
      {
        headers: {
          "Content-Type": "application/json",
          ...(token && {
            Authorization: `Bearer ${token.accessToken}`,
          }),
        },
      }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data?.message ?? "Failed to fetch questions");
    return data;
  },
};