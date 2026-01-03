import { useMutation } from "@tanstack/react-query";
import { ForgotPasswordFields } from "../_component/reset-password";
import { toast } from "sonner";


export function useForgotPassword() {
    const { isPending, error, isSuccess, mutate } = useMutation({
        mutationFn: async (data: ForgotPasswordFields) => {
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
        },
        onSuccess: () => {
            toast.success("we have sent an OTP to your email.", { duration: 59000 });
        },

        onError: (error: Error) => {
            toast.error(error.message);
        },
    });

    return {
        sendResetEmail: mutate,
        isPending,
        error,
        isSuccess,
    };
}
