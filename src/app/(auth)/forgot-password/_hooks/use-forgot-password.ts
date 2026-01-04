import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { forgotAction } from "../_actions/forgot.action";
import { ForgotPasswordFields } from "@/lib/types/auth";


export function useForgotPassword() {
    const { isPending, error, isSuccess, mutate } = useMutation({
        mutationFn: async (data: ForgotPasswordFields) => {
            return await forgotAction(data);
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
