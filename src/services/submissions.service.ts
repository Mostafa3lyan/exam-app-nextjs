import { getMyToken } from "@/lib/utility/manage-token";

export const submissionService = {
  getById: async (submissionId: string) => {
    const token = await getMyToken();
    const res = await fetch(
      `${process.env.API}/submissions/${submissionId}`,
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
    if (!res.ok) throw new Error(data?.message ?? "Failed to fetch submission");
    return data;
  },
};