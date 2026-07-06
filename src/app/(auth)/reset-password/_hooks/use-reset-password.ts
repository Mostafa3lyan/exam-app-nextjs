import { ResetPasswordData } from "@/lib/types/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { resetPasswordAction } from "../_actions/reset.action";
import { useRouter } from "next/navigation";


export function useResetPassword() {
    const router = useRouter();
    const { isPending, error, mutate } = useMutation({
        mutationFn: async (data: ResetPasswordData) => {
            return await resetPasswordAction(data);
        },
        onSuccess: () => {
            toast.success("password changed successfully");
            router.push("/login");
        }
    });

    return {
        resetPassword: mutate,
        isPending,
        error,
    };
}
