"use server"
import { JSON_HEADER } from "@/lib/constants/api.constant";
import { ForgotPasswordFields } from "@/lib/types/auth";

export async function forgotAction(data: ForgotPasswordFields) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/forgotPassword`, {
            method: "POST",
        ...JSON_HEADER,
            body: JSON.stringify(data),
        });

        const payload = await res.json();

        return payload;
    }
    
