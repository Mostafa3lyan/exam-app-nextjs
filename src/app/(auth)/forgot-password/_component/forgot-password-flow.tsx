"use client";

import { useState } from "react";
import { useResendTimer } from "../../../../hooks/use-resend-timer";
import ForgotPassword from "./forgot-password-form";
import ResetLink from "./reset-link";

export type ResetSteps = "email" | "link" | "reset";

export default function ResetPasswordFlow() {
  const [step, setStep] = useState<ResetSteps>("email");
  const [email, setEmail] = useState("");

// Hook 
  const { startTimer, timeLeft } = useResendTimer();

  return (
    <>
      {step === "email" && (
        <ForgotPassword
          email={email}
          onSuccess={(email) => {
            setEmail(email);
            setStep("link");

            // Start timer ONLY if not already running
            if (timeLeft === 0) {
              startTimer();
            }
          }}
        />
      )}

      {step === "link" && (
        <ResetLink
          email={email}
          setStep={setStep}
        />
      )}

    </>
  );
}
