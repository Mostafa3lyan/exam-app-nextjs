import { JSON_HEADER } from "@/lib/constants/api.constant";
import { EmailField } from "@/lib/types/auth";

export async function sendRegisterOtpAction(data: EmailField) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/auth/send-email-verification`,
        {
            method: "POST",
            ...JSON_HEADER,
            body: JSON.stringify(data),
        }
    );

    const payload = await res.json();

    if (!res.ok) {
        throw new Error(payload?.message ?? "Failed to send OTP");
    }

    return payload;
}