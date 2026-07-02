"use server"

import { VerifyResetFields } from "@/lib/types/auth";

export async function verifyAction(data: VerifyResetFields) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/verifyResetCode`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    const payload = await res.json();

    return payload;
}

