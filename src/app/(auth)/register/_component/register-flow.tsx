"use client";

import { useState } from "react";
import RegisterEmail from "./register-email";

export type RegisterSteps = "email" | "otp" | "register";

export default function RegisterFlow() {
  const [step, setStep] = useState<RegisterSteps>("email");

// Hook 
  // const { startTimer, timeLeft } = useResendTimer();

  return (
    <>
      {step === "email" && (
        <RegisterEmail

        />
      )}

      {/* {step === "otp" && (
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

      {step === "reset" && <ResetPassword email={email} />} */}
    </>
  );
}
