import { JSON_HEADER } from "@/lib/constants/api.constant";
import { EmailOtpFields } from "@/lib/types/auth";

export async function confirmRegisterOtpAction(data: EmailOtpFields) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/auth/confirm-email-verification`,
        {
            method: "POST",
            ...JSON_HEADER,
            body: JSON.stringify(data),
        }
    );

    const payload = await res.json();

    if (!res.ok) {
        throw new Error(payload?.message ?? "Failed to confirm OTP");
    }

    return payload;
}