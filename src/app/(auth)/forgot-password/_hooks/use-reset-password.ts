import { ResetPasswordData } from "@/lib/types/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { resetAction } from "../_actions/reset.action";


export function useResetPassword() {
    const { isPending, error, mutate } = useMutation({
        mutationFn: async (data: ResetPasswordData) => {
            return resetAction(data);
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });

    return {
        resetPassword: mutate,
        isPending,
        error,
    };
}
