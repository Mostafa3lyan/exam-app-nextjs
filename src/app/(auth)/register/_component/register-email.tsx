"use client";

import { EmailSchema } from "@/lib/schemas/forgot-password.schema";
import { EmailField } from "@/lib/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSendRegisterOtp } from "../_hooks/use-register-otp";
import EmailForm from "@/components/shared/email-form";
import { useEmail } from "@/context/email-context";
import CreateOrLogin from "../../login/_component/create-login";

export default function RegisterEmail() {
  const { email, setEmail } = useEmail();
  const { isPending, error, sendRegisterOtp } = useSendRegisterOtp();

  const form = useForm<EmailField>({
    resolver: zodResolver(EmailSchema),
    defaultValues: { email: email ?? "" },
  });

  const onSubmit = (values: EmailField) => {
    sendRegisterOtp(values, {
      onSuccess: () => setEmail(values.email),
    });
    
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
    <EmailForm
      title="Create an account"
      form={form}
      onSubmit={onSubmit}
      isPending={isPending}
      error={error}
    />
    <CreateOrLogin head="Already have an account?" link="/login" tail="Login" />
    </div>
  );
}