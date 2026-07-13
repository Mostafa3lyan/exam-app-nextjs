"use server";

import { getMyToken } from "@/lib/utility/manage-token";

export interface SubmitExamPayload {
  examId: string;
  startedAt: string;
  answers: { questionId: string; answerId: string }[];
}

export async function submitExamAction(data: SubmitExamPayload) {
  const token = await getMyToken();

  const res = await fetch(`${process.env.API}/submissions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.accessToken}`,
    },
    body: JSON.stringify(data),
  });

  const payload = await res.json();
  if (!res.ok) throw new Error(payload?.message ?? "Failed to submit exam");

  return payload;
}