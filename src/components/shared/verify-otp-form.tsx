"use client";

import ErrorComponent from "@/components/shared/error-component";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

interface VerifyOtpFormProps<T extends FieldValues> {
  target?: string; // e.g. the email the code was sent to
  onEdit?: () => void;
  form: UseFormReturn<T>;
  onSubmit: (values: T) => void;
  isPending: boolean;
  error?: Error | null;
  canResend: boolean;
  timeLeft: number;
  onResend: () => void;
}

export default function VerifyOtpForm<T extends FieldValues>({
  target,
  onEdit,
  form,
  onSubmit,
  isPending,
  error,
  canResend,
  timeLeft,
  onResend,
}: VerifyOtpFormProps<T>) {
  return (
    <div className="w-full max-w-md">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-inter">Verify OTP</CardTitle>
          <CardDescription>
            Please enter the 6-digit code we have sent to:
            {target && <span className="font-semibold text-foreground"> {target}</span>}
            {onEdit && (
              <span className="text-primary cursor-pointer ml-1" onClick={onEdit}>
                edit
              </span>
            )}
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
                name={"code" as Path<T>}
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
                          <button type="button" onClick={onResend} className="text-primary">
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

              {error && <ErrorComponent errorMessage={error?.message} />}

              <Button
                type="submit"
                className="w-full"
                disabled={
                  isPending || (!form.formState.isValid && form.formState.isSubmitted)
                }
              >
                {isPending ? "Verifying..." : "Verify Code"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}