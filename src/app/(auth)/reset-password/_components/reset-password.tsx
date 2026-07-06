"use client";

import ErrorComponent from "@/components/shared/error-component";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { ResetPasswordSchema, ResetPasswordSchemaType } from "@/lib/schemas/forgot-password.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CreateOrLogin from "../../../../components/shared/create-login";
import { PasswordInput } from "../../login/_component/password-input";
import { useResetPassword } from "../_hooks/use-reset-password";

export default function ResetPasswordForm({ token }: { token: string }) {
    const { isPending, error, resetPassword } = useResetPassword();

    const form = useForm<ResetPasswordSchemaType>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            newPassword: "",
            confirmPassword: "",
        },
    });

    const onSubmit = (values: ResetPasswordSchemaType) => {
        resetPassword({ token, newPassword: values.newPassword, confirmPassword: values.confirmPassword });
    };

    return (
        <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-md">
                <Card>
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
                                className="flex flex-col items-center gap-6"
                            >
                                <div className="w-full flex flex-col gap-4">
                                    <PasswordInput<ResetPasswordSchemaType>
                                        control={form.control}
                                        name="newPassword"
                                        label="New Password"
                                    />
                                    <PasswordInput<ResetPasswordSchemaType>
                                        control={form.control}
                                        name="confirmPassword"
                                        label="Confirm New Password"
                                    />
                                </div>

                                <ErrorComponent errorMessage={error?.message} />

                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={
                                        isPending ||
                                        (!form.formState.isValid && form.formState.isSubmitted)
                                    }
                                >
                                    {isPending ? "Resetting..." : "Reset Password"}
                                </Button>

                                <CreateOrLogin
                                    head="Don't have an account?"
                                    link="/register"
                                    tail="Create yours"
                                />
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}