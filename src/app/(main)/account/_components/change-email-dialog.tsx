"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { ChevronRight } from "lucide-react";
import { useChangeEmail } from "../_hooks/use-profile";
import { useResendTimer } from "@/hooks/use-resend-timer";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type EmailStep = "email" | "otp";

interface ChangeEmailDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function ChangeEmailDialog({ open, onClose }: ChangeEmailDialogProps) {
  const [step, setStep] = useState<EmailStep>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const { mutate: changeEmail, isPending } = useChangeEmail();
  const { timeLeft, canResend, startTimer } = useResendTimer();
  const queryClient = useQueryClient();

  const handleRequestEmail = () => {
    changeEmail({ type: "request", email }, {
      onSuccess: () => {
        setStep("otp");
        startTimer();
      },
    });
  };

  const handleConfirm = () => {
    changeEmail({ type: "confirm", code }, {
      onSuccess: () => {
        toast.success("Email changed successfully.");
        queryClient.invalidateQueries({ queryKey: ["profile"] });
        onClose();
      },
    });
  };

  const handleClose = () => {
    setStep("email");
    setEmail("");
    setCode("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        {/* Progress */}
        <div className="px-6 pt-6">
          <div className="flex items-center gap-2 mb-4">
            <div className={`size-4 rotate-45 ${step === "email" ? "bg-blue-600" : "bg-blue-600"}`} />
            <div className={`flex-1 h-0.5 ${step === "otp" ? "bg-blue-600" : "border-t-2 border-dashed border-blue-300"}`} />
            <div className={`size-4 rotate-45 border-2 ${step === "otp" ? "bg-blue-600 border-blue-600" : "border-blue-300"}`} />
          </div>

          <h2 className="text-2xl font-bold mb-1">Change Email</h2>

          {step === "email" ? (
            <>
              <p className="text-blue-600 font-semibold mb-4">Enter your new email</p>
              <div className="flex flex-col gap-2 mb-6">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  placeholder="user@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </>
          ) : (
            <>
              <p className="text-blue-600 font-semibold mb-1">Verify OTP</p>
              <p className="text-sm text-gray-500 mb-4">
                Please enter the 6-digit code we have sent to: {email}.{" "}
                <button onClick={() => setStep("email")} className="text-blue-600">
                  Edit
                </button>
              </p>

              <div className="flex justify-center mb-4">
                <InputOTP
                  maxLength={6}
                  value={code}
                  onChange={(value) => setCode(value.replace(/\D/g, ""))}
                  inputMode="numeric"
                >
                  {[...Array(6)].map((_, i) => (
                    <InputOTPGroup key={i}>
                      <InputOTPSlot index={i} />
                    </InputOTPGroup>
                  ))}
                </InputOTP>
              </div>

              <p className="text-center text-sm text-gray-500 mb-6">
                {canResend ? (
                  <button
                    onClick={() => { changeEmail({ type: "request", email }); startTimer(); }}
                    className="text-blue-600"
                  >
                    Resend code
                  </button>
                ) : (
                  <>You can request another code in: {timeLeft}s</>
                )}
              </p>
            </>
          )}
        </div>

        <Button
          className="m-4 h-14 text-base bg-blue-600 hover:bg-blue-700"
          onClick={step === "email" ? handleRequestEmail : handleConfirm}
          disabled={isPending || (step === "email" ? !email : code.length < 6)}
        >
          {step === "email" ? (
            <>Next <ChevronRight className="size-4 ml-1" /></>
          ) : (
            "Verify Code"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}