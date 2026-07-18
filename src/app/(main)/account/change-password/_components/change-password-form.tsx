"use client";

import { PasswordInput } from "@/app/(auth)/login/_component/password-input";
import ErrorComponent from "@/components/shared/error-component";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ChangePasswordFields, ChangePasswordSchema } from "@/lib/schemas/profile.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useChangePassword } from "../../_hooks/use-profile";



export default function ChangePasswordForm() {
  const { mutate: changePassword, isPending, error } = useChangePassword();

  const form = useForm<ChangePasswordFields>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  const onSubmit = (values: ChangePasswordFields) => {
    changePassword({
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
      confirmPassword: values.confirmPassword
    }, {
      onSuccess: () => {
        form.reset();
      }
    });
  };

    return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col ms-14 gap-6 max-w-3xl">
        <PasswordInput<ChangePasswordFields>
          control={form.control}
          name="currentPassword"
          label="Current Password"
        />
        <PasswordInput<ChangePasswordFields>
          control={form.control}
          name="newPassword"
          label="New Password"
        />
        <PasswordInput<ChangePasswordFields>
          control={form.control}
          name="confirmPassword"
          label="Confirm New Password"
        />

        <ErrorComponent errorMessage={error?.message} />

        <Button
          type="submit"
          className="h-14"
          disabled={isPending}
        >
          {isPending ? "Updating..." : "Update Password"}
        </Button>
      </form>
    </Form>
  );
}