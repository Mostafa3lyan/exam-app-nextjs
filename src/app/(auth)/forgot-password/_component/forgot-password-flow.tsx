"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useResendTimer } from "../../../../hooks/use-resend-timer";
import ForgotPassword from "./forgot-password-form";
import ResetPassword from "./reset-password";
import VerifyCode from "./verify-code";

export type ResetStep = "email" | "otp" | "reset";

export default function ResetPasswordFlow() {
  const [step, setStep] = useState<ResetStep>("email");
  const [email, setEmail] = useState("");

// Hook 
  const { startTimer, timeLeft } = useResendTimer();

  return (
    <>
      {step === "email" && (
        <ForgotPassword
          email={email}
          onSuccess={(email) => {
            toast.success(
              "We have sent an OTP to your email.",
              { duration: 3000 }
            );

            setEmail(email);
            setStep("otp");

            // Start timer ONLY if not already running
            if (timeLeft === 0) {
              startTimer();
            }
          }}
        />
      )}

      {step === "otp" && (
        <VerifyCode
          email={email}
          onBack={() => {
            setStep("email");
          }}
          onSuccess={() => {
            toast.success(
              "Code verified. You may now reset your password."
            );
            setStep("reset");
          }}
        />
      )}

      {step === "reset" && <ResetPassword email={email} />}
    </>
  );
}
