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
import CreateYours from "./create-yours";
import ErrorComponent from "./error-component";
import { PasswordInput } from "./password-input";

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

              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>

              <ErrorComponent error={error as Error} />

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
              <CreateYours />
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
