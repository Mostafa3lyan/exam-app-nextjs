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
import { LoginSchema } from "@/lib/schemas/login.schema";
import { LoginFields } from "@/lib/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLogin } from "../_hooks/use-login";
import { PasswordInput } from "./password-input";
import { CircleX } from "lucide-react";

export function LoginForm() {
  const { isPending, error, login } = useLogin();

  const form = useForm<LoginFields>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFields> = async (values) => {
    login(values);
  };

  return (
    <div className="flex min-h-svh items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-inter">Login</CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* email */}
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

              {/* password */}
              <PasswordInput<LoginFields>
                control={form.control}
                name="password"
              />

              {/* <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Password</FormLabel>

                    <div className="relative">
                      <FormControl>
                        <Input
                          className="pe-10 "
                          type={showPassword ? "text" : "password"}
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>

                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={
                          showPassword ? "Show password" : "Hide password"
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-input hover:text-gray-700"
                      >
                        {showPassword ? (
                          <Eye size={18} />
                        ) : (
                          <EyeOff size={18} />
                        )}
                      </button>
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>

              {error && (
                <div className="p-2 bg-destructive/10 border border-destructive relative ">
                  <CircleX className="text-destructive bg-white absolute rounded-full size-5 top-0 left-1/2 -translate-y-1/2" />
                  <p className="text-sm text-destructive text-center">
                    {error.message || "Something went wrong"}
                  </p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={
                  isPending ||
                  (!form.formState.isValid && form.formState.isSubmitted)
                }
              >
                Login
              </Button>
              <span className="text-muted-foreground text-sm flex justify-center">
                Don’t have an account?{" "}
                <Link className="text-primary px-1" href="/register">
                  {" "}
                  Create yours
                </Link>
              </span>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
