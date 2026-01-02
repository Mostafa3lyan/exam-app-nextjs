import { RegisterFields, RegisterResponse } from "../types/auth";

export async function registerAction(fields: RegisterFields) {
    const res = await fetch(`https://exam.elevateegy.com/api/v1/auth/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(fields),
        cache: "no-store",
    });

    let payload: ApiResponse<RegisterResponse>;

    try {
        payload = await res.json();
    } catch {
        throw new Error("Invalid server response");
    }

    if (!res.ok) {
        throw new Error(payload?.message || "Registration failed");
    }

    return payload;
}
