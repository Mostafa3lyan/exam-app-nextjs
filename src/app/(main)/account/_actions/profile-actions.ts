"use server";

import { getMyToken } from "@/lib/utility/manage-token";

async function getAuthHeaders() {
  const token = await getMyToken();

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token.accessToken}`,
  };
}

export async function updateProfileAction(body: {
  firstName: string;
  lastName: string;
  phone?: string;
}) {
  const headers = await getAuthHeaders();

  const res = await fetch(`${process.env.API}/users/profile`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message ?? "Failed to update profile");
  }

  return data;
}

export async function changePasswordAction(body: {
  currentPassword: string;
  newPassword: string;
}) {
  const headers = await getAuthHeaders();

  const res = await fetch(`${process.env.API}/users/change-password`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message ?? "Failed to change password");
  }

  return data;
}

export async function deleteAccountAction() {
  const headers = await getAuthHeaders();

  const res = await fetch(`${process.env.API}/users/account`, {
    method: "DELETE",
    headers,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message ?? "Failed to delete account");
  }

  return data;
}

export async function changeEmailAction(body: {
  type: "request" | "confirm";
  email?: string;
  code?: string;
}) {
  const headers = await getAuthHeaders();

  const { type, ...payload } = body;

  const endpoint =
    type === "request"
      ? "/users/email/request"
      : "/users/email/confirm";

  const res = await fetch(`${process.env.API}${endpoint}`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message ?? "Failed to process email change");
  }

  return data;
}