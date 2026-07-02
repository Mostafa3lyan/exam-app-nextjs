import { ForgotPasswordFields } from "@/lib/types/auth";
import { useMutation } from "@tanstack/react-query";
import { forgotAction } from "../_actions/forgot.action";


export function useForgotPassword() {
    const { isPending, error, mutate } = useMutation({
        mutationFn: async (data: ForgotPasswordFields) => {
            return await forgotAction(data);
        },

    });

    return {
        sendResetEmail: mutate,
        isPending,
        error,
    };
}
