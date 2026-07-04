"use client";

import EmailForm from "@/components/shared/email-form";
import { useEmail } from "@/context/email-context";
import { useResendTimer } from "@/hooks/use-resend-timer";
import { EmailSchema } from "@/lib/schemas/forgot-password.schema";
import { EmailField } from "@/lib/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CreateOrLogin from "../../login/_component/create-login";
import { useSendRegisterOtp } from "../_hooks/use-register-otp";
import { RegisterSteps } from "./register-flow";

export default function RegisterEmail(
{setStep}: {setStep: React.Dispatch<React.SetStateAction<RegisterSteps>>}
) {
  const { email, setEmail } = useEmail();
  const { isPending, error, sendRegisterOtp } = useSendRegisterOtp();
    const { timeLeft, startTimer } = useResendTimer();
  

  const form = useForm<EmailField>({
    resolver: zodResolver(EmailSchema),
    defaultValues: { email: email ?? "" },
  });

  const onSubmit = (values: EmailField) => {
    if (timeLeft > 0) {
      setStep("otp");
      return;
    }
    sendRegisterOtp(values, {
      onSuccess: () => {
        setEmail(values.email);
        setStep("otp");
          startTimer();
  }
    });
    
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <EmailForm
      title="Create Account"
      form={form}
      onSubmit={onSubmit}
      isPending={isPending}
      error={error}
    />
    <CreateOrLogin head="Already have an account?" link="/login" tail="Login" />
    </div>
  );
}