"use client";

import { useState } from "react";
import RegisterEmail from "./register-email";
import ConfirmRegisterOtp from "./confirm-register-otp";
import { RegisterForm } from "./register-form";

export type RegisterSteps = "email" | "otp" | "register";

export default function RegisterFlow() {
  const [step, setStep] = useState<RegisterSteps>("email");

  // Hook 
  // const { startTimer, timeLeft } = useResendTimer();

  return (
    <>
      {step === "email" && (
        <RegisterEmail
          setStep={setStep}
        />
      )
      }

      {step === "otp" && (
        <ConfirmRegisterOtp
          setStep={setStep}
        />
      )}

      {step === "register" && <RegisterForm />}
    </>
  );
}
