import { EmailOtpFields } from "@/lib/types/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { confirmRegisterOtpAction } from "../_actions/confirm-register-otp";

export function useConfirmRegisterOtp() {
    
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (data: EmailOtpFields) => {
      return await confirmRegisterOtpAction(data);
    },
    onSuccess: () => {
      
      toast.success("otp verified successfully");
    },
  });

  return { isPending, error, confirmRegisterOtp: mutate };
}
