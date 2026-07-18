"use server";

import { ChangePasswordFields, OtpFields } from "@/lib/schemas/profile.schema";
import { getMyToken } from "@/lib/utility/manage-token";
import { revalidateTag } from "next/cache";

// get auth headers
async function getAuthHeaders() {
  const token = await getMyToken();

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token.accessToken}`,
  };
}

// update profile
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
  revalidateTag('profile-data');

  return data;
}

// change password
export async function changePasswordAction(data: ChangePasswordFields) {
  const headers = await getAuthHeaders();

  const res = await fetch(`${process.env.API}/users/change-password`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });

  const payload = await res.json();

  if (!res.ok) {
    throw new Error(payload?.message ?? "Failed to change password");
  }

  return payload;
}

// delete account
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

// request email
export async function requestEmailAction(data: { newEmail: string }) {
  const headers = await getAuthHeaders();

  const res = await fetch(`${process.env.API}/users/email/request`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });

  const payload = await res.json();

  if (!res.ok) {
    throw new Error(payload?.message ?? "Failed to process email change");
  }

  return payload;
}

// confirm email
export async function changeEmailAction(data: OtpFields) {
  const headers = await getAuthHeaders();

  const res = await fetch(`${process.env.API}/users/email/confirm`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });

  const payload = await res.json();

  if (!res.ok) {
    throw new Error(payload?.message ?? "Failed to process email change");
  }

  // revalidateTag("profile-data");

  return payload;
}