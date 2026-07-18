"use client";

import EmailForm from "@/components/shared/email-form";
import { ProgressBar } from "@/components/shared/prograss-bar";
import VerifyOtpForm from "@/components/shared/verify-otp-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useEmail } from "@/context/email-context";
import { useResendTimer } from "@/hooks/use-resend-timer";
import { EmailSchema, EmailSchemaType } from "@/lib/schemas/forgot-password.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useConfirmChangeEmail, useRequestChangeEmail } from "../_hooks/use-profile";
import { OtpFields, OtpSchema } from "@/lib/schemas/profile.schema";
type EmailStep = "email" | "otp" | "reLogin";

interface ChangeEmailDialogProps {
  open: boolean;
  onClose: () => void;
}

const stepNumber: Record<EmailStep, number> = {
  email: 1,
  otp: 2,
  reLogin: 3,
};

export default function ChangeEmailDialog({ open, onClose }: ChangeEmailDialogProps) {
  const router = useRouter();

  const [step, setStep] = useState<EmailStep>("email");

  const { mutate: requestChangeEmail, isPending: isRequesting, error: requestError, reset: resetRequestMutation } = useRequestChangeEmail();
  const { mutate: confirmChangeEmail, isPending: isConfirming, error: confirmError } = useConfirmChangeEmail();
  const { timeLeft, canResend, startTimer } = useResendTimer();
  const { email, setEmail } = useEmail();

  const emailForm = useForm<EmailSchemaType>({
    resolver: zodResolver(EmailSchema),
    defaultValues: { email: "" },
  });

  const otpForm = useForm<OtpFields>({
    resolver: zodResolver(OtpSchema),
    defaultValues: { code: "" },
  });

  const handleRequestEmail = (data: EmailSchemaType) => {
    if (email === data.email && timeLeft > 0) {
      setStep("otp");
      return;
    }

    requestChangeEmail(
      { newEmail: data.email },
      {
        onSuccess: () => {
          setEmail(data.email);
          setStep("otp");
          startTimer();
        },
      }
    );
  };

const handleConfirmOtp = (values: OtpFields) => {
  confirmChangeEmail(
    { code: values.code },
    {
      onSuccess: () => {
        setStep("reLogin");
      },
    }
  );
};

  const handleClose = () => {
    setStep("email");
    emailForm.reset();
    resetRequestMutation();
    otpForm.reset();
    onClose();
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg min-h-[400px] overflow-hidden p-6">
        <div className="px-4 mt-4 w-full">
          <ProgressBar currentStep={stepNumber[step]} steps={3} />
        </div>

        {step === "email" && (
          <EmailForm
            title="Change Email"
            description="Enter your new email address."
            form={emailForm}
            onSubmit={handleRequestEmail}
            isPending={isRequesting}
            error={requestError}
          />
        )}

        {step === "otp" && (
          <VerifyOtpForm
            target={email}
            onEdit={() => setStep("email")}
            form={otpForm}
            onSubmit={handleConfirmOtp}
            isPending={isConfirming}
            error={confirmError}
            canResend={canResend}
            timeLeft={timeLeft}
            onResend={() => {
              requestChangeEmail({ newEmail: email });
              startTimer();
            }}
          />
        )}

        {step === "reLogin" && (
          <div className="w-full max-w-md">
            <div className="flex flex-col items-center justify-start gap-3">
              <p className="text-center text-sm text-muted-foreground px-4">
                Please logout and login again to apply the changes.
              </p>
              <Button
                className=" w-3/6"
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                <LogOut className="size-4 rotate-180" />
                Logout
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}