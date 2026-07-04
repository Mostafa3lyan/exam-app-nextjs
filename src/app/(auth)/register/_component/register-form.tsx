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

import { SubmitHandler, useForm } from "react-hook-form";

import ErrorComponent from "@/components/shared/error-component";
import { PhoneInput } from "@/components/ui/phone-input";
import CreateOrLogin from "../../login/_component/create-login";
import { PasswordInput } from "../../login/_component/password-input";
import { useRegister } from "../_hooks/use-register";
import { useEmail } from "@/context/email-context";
import { ProgressBar } from "@/components/shared/prograss-bar";

export function RegisterForm() {
  const { isPending, error, register } = useRegister();
  const {email} = useEmail();

  const form = useForm<RegisterFields>({
    resolver: zodResolver(RegisterSchema),
    mode: "onSubmit",
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: email || "",
      phone: "",
      password: "",
      confirmPassword: "",
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
                  <div className="pt-2 ml-5 w-full">
                    <ProgressBar currentStep={3} steps={4} />
                  </div>
        <CardHeader>
          <CardTitle className="text-3xl font-inter">Create Account</CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                      <FormLabel className="font-semibold">Last Name</FormLabel>
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
                name="confirmPassword"
                label="Confirm Password"
              />

              {/*Error */}
              {error && <ErrorComponent errorMessage={error.message} />}

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
              <CreateOrLogin
                head={"Already have an account?"}
                link={"/login"}
                tail={"Login"}
              />
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
