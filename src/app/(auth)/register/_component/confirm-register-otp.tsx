"use client";

import ErrorComponent from "@/components/shared/error-component";
import { ProgressBar } from "@/components/shared/prograss-bar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
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
    confirmRegisterOtp({ ...values, email }, {
      onSuccess: () => setStep("register"),
    });
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">

      <div className="w-full max-w-md">

        <Card>
          <div className="pt-2 ml-5 w-full">
            <ProgressBar currentStep={2} steps={4} />
          </div>

          <CardHeader>
            <CardTitle className="text-3xl font-inter">Verify OTP</CardTitle>
            <CardDescription>
              Please enter the 6-digit code we have sent to your email.
              <span className="text-primary cursor-pointer" onClick={() => setStep("email")}>
                edit
              </span>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col items-center gap-6"
              >
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputOTP
                          maxLength={6}
                          value={field.value}
                          onChange={(value) => {
                            if (/^\d*$/.test(value)) field.onChange(value);
                          }}
                          inputMode="numeric"
                          pattern="[0-9]*"
                        >

                          {[...Array(6)].map((_, i) => (
                            <InputOTPGroup key={i}>
                              <InputOTPSlot index={i} />
                            </InputOTPGroup>
                          ))}
                        </InputOTP>
                      </FormControl>

                      <FormDescription className="text-center">
                        {canResend ? (
                          <>
                            Didn&apos;t receive the code?{" "}
                            <button
                              type="button"
                              onClick={() => {
                                if (!email) return;
                                sendRegisterOtp({ email });
                                startTimer();
                              }}
                              className="text-primary"
                            >
                              Resend
                            </button>
                          </>
                        ) : (
                          <>You can request another code in: {timeLeft}s</>
                        )}
                      </FormDescription>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <ErrorComponent errorMessage={error?.message} />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={
                    isPending ||
                    (!form.formState.isValid && form.formState.isSubmitted)
                  }
                >
                  {isPending ? "Verifying..." : "Verify Code"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}