import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export type VerifyResetFields = {
    resetCode: string;
};

export function useVerifyCode() {
    const { isPending, error, mutate } = useMutation({
        mutationFn: async (data: VerifyResetFields) => {
            const res = await fetch(`https://exam.elevateegy.com/api/v1/auth/verifyResetCode`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const payload = await res.json();

            if (!res.ok) {
                throw new Error(payload.message || "Something went wrong");
            }

            return payload;
        },
        onSuccess: () => {
            toast.success("Code verified. You may now reset your password.");
        },

        onError: (error: Error) => {
            toast.error(error.message);
        },
    });

    return {
        verifyResetCode: mutate,
        isPending,
        error,
    };
}
