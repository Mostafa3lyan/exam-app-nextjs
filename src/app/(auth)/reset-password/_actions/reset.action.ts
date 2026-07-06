"use server"
import { JSON_HEADER } from "@/lib/constants/api.constant";
import { ResetPasswordData } from "@/lib/types/auth";

export async function resetPasswordAction(data: ResetPasswordData) {
    const res = await fetch(`${process.env.API}/auth/reset-password`, {
        method: "POST",
        ...JSON_HEADER,
        body: JSON.stringify(data),
    });

    const payload = await res.json();

    if (!res.ok) {
        throw new Error(payload?.message ?? "Failed to reset password");
    }

    return payload;
}
