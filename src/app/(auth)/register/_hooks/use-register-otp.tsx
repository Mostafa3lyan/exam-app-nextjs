import { EmailField } from "@/lib/types/auth";
import { useMutation } from "@tanstack/react-query";
import { sendRegisterOtpAction } from "../_actions/send-register-otp.action";
import { toast } from "sonner";

export function useSendRegisterOtp() {
    
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (data: EmailField) => {
      return await sendRegisterOtpAction(data);
    },
    onSuccess: () => {
      
      toast.success("we have sent an OTP to your email");
    },
  });

  return { isPending, error, sendRegisterOtp: mutate };
}
