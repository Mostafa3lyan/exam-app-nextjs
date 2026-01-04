"use client"

import { useState } from "react"
import VerifyCode from "./verify-code"
import ForgotPassword from "./forgot-password-form"
import { useResendTimer } from "../_hooks/use-resend-timer"
import { toast } from "sonner"
import ResetPassword from "./reset-password"
import { useRouter } from "next/navigation";


export type ResetStep = "email" | "otp" | "reset"

export default function ResetPasswordFlow() {
    const [step, setStep] = useState<ResetStep>("email")
    const [email, setEmail] = useState("")
    const { startTimer } = useResendTimer(30);
    const router = useRouter();

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
                        toast.success("Code verified. You may now reset your password.");
                        setStep("reset")
                    }}
                />
            )}

            {step === "reset" && (
                <ResetPassword
                email={email}
                onSuccess={() => {
                    toast.success("password changed successfully");
                    router.push("/login");
                }}
            />
            )}
        </>
    )
}
