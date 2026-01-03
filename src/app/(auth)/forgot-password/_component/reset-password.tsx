"use client";

import { cn } from "@/lib/shadcn/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MoveRight, CircleCheck, CircleX } from "lucide-react";
import Link from "next/link";
import { useForgotPassword } from "../_hooks/use-forgot-password";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordSchema } from "@/lib/schemas/forgot-password.schema";

export type ForgotPasswordFields = {
  email: string;
};

export default function ForgotPassword({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { isPending, isSuccess, error, sendResetEmail } =
    useForgotPassword();

  const form = useForm<ForgotPasswordFields>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: ForgotPasswordFields) => {
    sendResetEmail(values);
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-md">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-inter">
                Forget Password
              </CardTitle>
              <CardDescription>
                Don’t worry, we will help you recover your account.
              </CardDescription>
            </CardHeader>

            <CardContent>
              {isSuccess ? (
                /* SUCCESS */
                <div className="flex flex-col items-center gap-3 text-center">
                  <CircleCheck className="size-10 text-green-600" />
                  <p className="text-sm text-muted-foreground">
                    If this email exists, a reset link has been sent.
                  </p>
                  <Link
                    href="/login"
                    className="text-primary underline text-sm"
                  >
                    Back to login
                  </Link>
                </div>
              ) : (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-6"
                  >
                    {/* EMAIL */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="m@example.com"
                              autoComplete="email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* API ERROR */}
                    {error && (
                      <div className="relative rounded-md border border-destructive bg-destructive/10 p-3">
                        <CircleX className="absolute -top-2 left-1/2 size-5 -translate-x-1/2 rounded-full bg-background text-destructive" />
                        <p className="text-center text-sm text-destructive">
                          {error.message}
                        </p>
                      </div>
                    )}

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
                      {isPending ? "Sending..." : "Continue"}
                      <MoveRight />
                    </Button>

                    <span className="flex justify-center text-sm text-muted-foreground">
                      Already have an account?
                      <Link className="px-1 text-primary" href="/login">
                        Login
                      </Link>
                    </span>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
