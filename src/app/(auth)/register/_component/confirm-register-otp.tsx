"use client";

import { ProgressBar } from "@/components/shared/prograss-bar";
import VerifyOtpForm from "@/components/shared/verify-otp-form";
import { useEmail } from "@/context/email-context";
import { VerifyCodeSchema } from "@/lib/schemas/forgot-password.schema";
import { EmailOtpFields } from "@/lib/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useResendTimer } from "../../../../hooks/use-resend-timer";
import { useConfirmRegisterOtp } from "../_hooks/use-confirm-register";
import { useSendRegisterOtp } from "../_hooks/use-register-otp";
import { RegisterSteps } from "./register-flow";

export default function ConfirmRegisterOtp({
  setStep,
}: {
  setStep: React.Dispatch<React.SetStateAction<RegisterSteps>>;
}) {
  const { isPending, error, confirmRegisterOtp } = useConfirmRegisterOtp();
  const { sendRegisterOtp } = useSendRegisterOtp();
  const { timeLeft, canResend, startTimer } = useResendTimer();
  const { email } = useEmail();

  const form = useForm<EmailOtpFields>({
    resolver: zodResolver(VerifyCodeSchema),
    defaultValues: { code: "", email: email || "" },
  });

  const onSubmit = (values: EmailOtpFields) => {
    if (!email) return;
    confirmRegisterOtp({ ...values, email }, { onSuccess: () => setStep("register") });
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="px-3 w-full max-w-md">
        <ProgressBar currentStep={2} steps={3} />
      </div>

      <VerifyOtpForm
        onEdit={() => setStep("email")}
        form={form}
        onSubmit={onSubmit}
        isPending={isPending}
        error={error}
        canResend={canResend}
        timeLeft={timeLeft}
        onResend={() => {
          if (!email) return;
          sendRegisterOtp({ email });
          startTimer();
        }}
      />
    </div>
  );
}