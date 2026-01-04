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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ForgotPasswordSchema } from "@/lib/schemas/forgot-password.schema";
import { cn } from "@/lib/shadcn/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { MoveRight } from "lucide-react";
import { useForm } from "react-hook-form";
import CreateYours from "../../login/_component/create-yours";
import ErrorComponent from "../../login/_component/error-component";
import { useForgotPassword } from "../_hooks/use-forgot-password";

export type ForgotPasswordFields = {
  email: string;
};
export type ForgotPasswordProps = {
  email?: string
  onSuccess: (email: string) => void
  onBack?: () => void
}


export default function ForgotPassword({
  email,
  onSuccess,
  className,
  ...props
}: ForgotPasswordProps & React.ComponentPropsWithoutRef<"div">) {
  const { isPending, error, sendResetEmail } =
    useForgotPassword();

  const form = useForm<ForgotPasswordFields>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: email ?? "",
    },
  });

  const onSubmit = (values: ForgotPasswordFields) => {
    sendResetEmail(values, {
      onSuccess: () => {
        onSuccess(values.email)
      },
    });
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
                Don&apos;t worry, we will help you recover your account.
              </CardDescription>
            </CardHeader>

            <CardContent>
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
                      {isPending ? "Sending..." : "Continue"}
                      <MoveRight />
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
