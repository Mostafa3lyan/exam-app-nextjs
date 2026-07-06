"use server";
import { JSON_HEADER } from "@/lib/constants/api.constant";
import { ForgotPasswordSchemaType } from "@/lib/schemas/forgot-password.schema";

export async function forgotAction(data: ForgotPasswordSchemaType) {
    const redirectUrl = "http://localhost:3000/reset-password";
    const res = await fetch(`${process.env.API}/auth/forgot-password`, {
        method: "POST",
        ...JSON_HEADER,
        body: JSON.stringify({ ...data, redirectUrl }),
    });

    const payload = await res.json();

    if (!res.ok) {
        throw new Error(payload?.message ?? "Failed to send reset email");
    }

    return payload;
}