import { VerifyResetFields } from "@/lib/types/auth";
import { useMutation } from "@tanstack/react-query";
import { verifyAction } from "../_actions/verify.action";


export function useVerifyCode() {
    const { isPending, error, mutate } = useMutation({
        mutationFn: async (data: VerifyResetFields) => {
            const payload = await verifyAction(data);

            if ("code" in payload) {
                throw new Error(payload?.message || "Invalid OTP");
            }

            return payload;
        },

    });

    return {
        verifyResetCode: mutate,
        isPending,
        error,
    };
}
