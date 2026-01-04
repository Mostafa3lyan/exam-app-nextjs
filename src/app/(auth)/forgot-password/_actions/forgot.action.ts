"use server"
import { ForgotPasswordFields } from "@/lib/types/auth";

export async function forgotAction(data: ForgotPasswordFields) {
        const res = await fetch(`https://exam.elevateegy.com/api/v1/auth/forgotPassword`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const payload = await res.json();

        if (!res.ok) {
            throw new Error(payload.message || "Something went wrong");
        }

        return payload;
    }
    
