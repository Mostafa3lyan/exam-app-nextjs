"use client";

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
    FormMessage
} from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { VerifyCodeSchema } from "@/lib/schemas/forgot-password.schema";
import { cn } from "@/lib/shadcn/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CreateYours from "../../login/_component/create-yours";
import ErrorComponent from "../../login/_component/error-component";
import { useForgotPassword } from "../_hooks/use-forgot-password";
import { useResendTimer } from "../_hooks/use-resend-timer";
import { useVerifyCode, VerifyResetFields } from "../_hooks/use-verify-code";
import { ForgotPasswordProps } from "./forgot-password-form";
import { MoveLeft } from "lucide-react";
import { toast } from "sonner";



export default function VerifyCode({
    email,
    onBack,
    className,
    ...props
}: ForgotPasswordProps & React.ComponentPropsWithoutRef<"div">) {
    const { timeLeft, canResend, startTimer } = useResendTimer(30);

    const { isPending, error, verifyResetCode } = useVerifyCode();
    const { sendResetEmail } = useForgotPassword();
    const form = useForm<VerifyResetFields>({
        resolver: zodResolver(VerifyCodeSchema),
        defaultValues: {
            resetCode: "",
        },
    });

    const onSubmit = (values: VerifyResetFields) => {
        verifyResetCode(values);
    };

    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="w-full max-w-md">
                <div className={cn("flex flex-col gap-6", className)} {...props}>

                    <Card >
                        <Button
                            className="w-5 ml-5"
                            type="button"
                            variant="ghost"
                            onClick={() => onBack!()}
                        >
                            <MoveLeft className="text-gray-800 size-5" />
                        </Button>
                        <CardHeader>
                            <CardTitle className="text-3xl font-inter">
                                Verify OTP
                            </CardTitle>
                            <CardDescription>
                                Please enter the 6-digits code we have sent to your email.
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="flex items-center flex-col gap-6"
                                >
                                    {/* OTP */}
                                    <FormField
                                        control={form.control}
                                        name="resetCode"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <InputOTP
                                                        maxLength={6}
                                                        value={field.value}
                                                        onChange={(value) => {
                                                            //  allow numbers only
                                                            if (/^\d*$/.test(value)) {
                                                                field.onChange(value)
                                                            }
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
                                                                    if (email) {
                                                                        sendResetEmail({ email });
                                                                        toast.success("a new OTP have been sent to your email.", { duration: 3000 })
                                                                        startTimer();
                                                                    }
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


                                    {/* API ERROR */}
                                    <ErrorComponent error={error as Error} />

                                    {/* SUBMIT */}
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={
                                            isPending ||
                                            (!form.formState.isValid &&
                                                form.formState.isSubmitted)
                                        }
                                    >
                                        {isPending ? "Verifying..." : "Verify Code"}
                                    </Button>

                                    <CreateYours />
                                </form>
                            </Form>

                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
