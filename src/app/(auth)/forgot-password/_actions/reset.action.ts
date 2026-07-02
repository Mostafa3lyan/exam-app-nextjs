"use server"
import { ResetPasswordData } from "@/lib/types/auth";

export async function resetAction(data: ResetPasswordData) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/resetPassword`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    const payload = await res.json();

    return payload;
}

