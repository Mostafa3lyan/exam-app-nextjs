"use client"

import { useState } from "react"
import VerifyCode from "./verify-code"
import ForgotPassword from "./forgot-password-form"
import { useResendTimer } from "../_hooks/use-resend-timer"
import { toast } from "sonner"


export type ResetStep = "email" | "otp" | "reset"

export default function ResetPasswordFlow() {
    const [step, setStep] = useState<ResetStep>("email")
    const [email, setEmail] = useState("")
    const { startTimer } = useResendTimer(30);

    return (
        <>
            {step === "email" && (
                <ForgotPassword
                    email={email}
                    onSuccess={(email) => {
                        toast.success("we have sent an OTP to your email.", { duration: 3000 })
                        setEmail(email)
                        setStep("otp")
                        startTimer()
                    }}
                />
            )}

            {step === "otp" && (
                <VerifyCode
                    email={email}
                    onBack={() => {
                        setStep("email")
                    }}
                    onSuccess={() => {
                        setStep("reset")
                    }}
                />
            )}
        </>
    )
}
