"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { RegisterSchema } from "@/lib/schemas/register.schema";
import { RegisterFields } from "@/lib/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";

import { CircleX } from "lucide-react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

import { PasswordInput } from "../../login/_component/password-input";
import { useRegister } from "../_hooks/use-register";
import { PhoneInput } from "@/components/ui/phone-input";

export function RegisterForm() {
    const { isPending, error, register } = useRegister();

    const form = useForm<RegisterFields>({
        resolver: zodResolver(RegisterSchema),
        mode: "onSubmit",
        defaultValues: {
            username: "",
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            password: "",
            rePassword: "",
        },
    });

    function formatEgyptPhone(phone: string) {
        return phone.replace(/^(\+20|0020)/, "0");
    }


    const onSubmit: SubmitHandler<RegisterFields> = async (values) => {
        const formattedValues = {
            ...values,
            phone: formatEgyptPhone(values.phone),
        };
        register(formattedValues);
    };



    return (
        <div className="flex min-h-svh items-center justify-center">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-3xl font-inter">
                        Create Account
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            <div className="flex gap-2 ">
                                {/* First Name */}
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-semibold">
                                                First Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="Mostafa" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Last Name */}
                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-semibold">
                                                Last Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="Elyan" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Username */}
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-semibold">Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="mostafa123" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Email */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-semibold">Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                autoComplete="email"
                                                placeholder="mo123@example.com"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Phone */}
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-semibold">Phone</FormLabel>
                                        <FormControl>
                                            <PhoneInput placeholder="01155226633" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Password */}
                            <PasswordInput<RegisterFields>
                                control={form.control}
                                name="password"
                            />

                            {/* Confirm Password */}
                            <PasswordInput<RegisterFields>
                                control={form.control}
                                name="rePassword"
                                label="Confirm Password"
                            />

                            {/* API Error */}
                            {error && (
                                <div className="relative rounded-md border border-destructive bg-destructive/10 p-3">
                                    <CircleX className="absolute -top-2 left-1/2 size-5 -translate-x-1/2 rounded-full bg-background text-destructive" />
                                    <p className="text-center text-sm text-destructive">
                                        {error.message || "Something went wrong"}
                                    </p>
                                </div>
                            )}

                            {/* Submit */}
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={
                                    isPending ||
                                    (!form.formState.isValid && form.formState.isSubmitted)
                                }
                            >
                                {isPending ? "Creating account..." : "Create Account"}
                            </Button>

                            {/* Login link */}
                            <span className="flex justify-center text-sm text-muted-foreground">
                                Already have an account?
                                <Link className="px-1 text-primary" href="/login">
                                    Login
                                </Link>
                            </span>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
