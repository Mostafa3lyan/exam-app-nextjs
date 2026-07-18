import { useMutation } from "@tanstack/react-query";
import { forgotAction } from "../_actions/forgot.action";
import { EmailSchemaType } from "@/lib/schemas/forgot-password.schema";
import { toast } from "sonner";


export function useForgotPassword() {
    const { isPending, error, mutate } = useMutation({
        mutationFn: async (data: EmailSchemaType) => {
            return await forgotAction(data);
        },

        onSuccess: () => {
            toast.success(
                "We have sent a password reset link to your email.",
                { duration: 3000 }
            );
        }
    });

    return {
        sendResetEmail: mutate,
        isPending,
        error,
    };
}
