"use client";

import { PasswordInput } from "@/app/(auth)/login/_component/password-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useChangePassword } from "../_hooks/use-profile";

const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8),
  confirmNewPassword: z.string().min(8),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "Passwords don't match",
  path: ["confirmNewPassword"],
});

type ChangePasswordFields = z.infer<typeof ChangePasswordSchema>;

export default function ChangePasswordPage() {
  const { mutate: changePassword, isPending } = useChangePassword();

  const form = useForm<ChangePasswordFields>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmNewPassword: "" },
  });

  const onSubmit = (values: ChangePasswordFields) => {
    changePassword({
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    }, {
      onSuccess: () => form.reset(),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 max-w-3xl">
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
          name="confirmNewPassword"
          label="Confirm New Password"
        />

        <Button
          type="submit"
          className="h-14 bg-blue-600 hover:bg-blue-700"
          disabled={isPending}
        >
          {isPending ? "Updating..." : "Update Password"}
        </Button>
      </form>
    </Form>
  );
}