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
    Form
} from "@/components/ui/form";
import { ResetPasswordSchema } from "@/lib/schemas/forgot-password.schema";
import { cn } from "@/lib/shadcn/utils";
import { ForgotPasswordProps, ResetPasswordFields } from "@/lib/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CreateYours from "../../login/_component/create-yours";
import ErrorComponent from "../../login/_component/error-component";
import { PasswordInput } from "../../login/_component/password-input";
import { useResetPassword } from "../_hooks/use-reset-password";



export default function ResetPassword({
    email,
    className,
    ...props
}: ForgotPasswordProps & React.ComponentPropsWithoutRef<"div">) {

    const { isPending, error, resetPassword } = useResetPassword();
    const form = useForm<ResetPasswordFields>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            newPassword: "",
            confirmNewPassword: "",
        },
    });

    const onSubmit = (values: ResetPasswordFields) => {
        const { newPassword } = values;
        if (email) {
            resetPassword({ email, newPassword });
        }
    };

    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="w-full max-w-md">
                <div className={cn("flex flex-col gap-6", className)} {...props}>

                    <Card >
                        <CardHeader>
                            <CardTitle className="text-3xl font-inter">
                                Create a New Password
                            </CardTitle>
                            <CardDescription>
                                Create a new strong password for your account.
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="flex items-center flex-col gap-6"
                                >
                                    {/* password */}
                                    <span className="w-full flex flex-col gap-4">
                                        <PasswordInput<ResetPasswordFields>
                                            control={form.control}
                                            name="newPassword"
                                            label="New Password"
                                        />

                                        {/* Confirm Password */}
                                        <PasswordInput<ResetPasswordFields>
                                            control={form.control}
                                            name="confirmNewPassword"
                                            label="Confirm New Password"
                                        />
                                    </span>

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
                                        {isPending ? "Resetting..." : "Reset Password"}
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
