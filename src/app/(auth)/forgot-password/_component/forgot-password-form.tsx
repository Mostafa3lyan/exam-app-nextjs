"use client";

import EmailForm from "@/components/shared/email-form";
import { EmailSchema, ForgotPasswordSchemaType} from "@/lib/schemas/forgot-password.schema";
import { ForgotPasswordProps } from "@/lib/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useForgotPassword } from "../_hooks/use-forgot-password";
import CreateOrLogin from "@/components/shared/create-login";


export default function ForgotPassword({
  email,
  onSuccess,
}: ForgotPasswordProps) {

  const { isPending, error, sendResetEmail } = useForgotPassword();

  const form = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      email: email ?? "",
    },
  });

  const onSubmit = (values: ForgotPasswordSchemaType) => {
    sendResetEmail(values, {
      onSuccess: () => {
        onSuccess(values.email)
      },
    });
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center  p-6 md:p-10">
      
      <EmailForm title="Forgot Password" description="Don't worry, we will help you recover your account." form={form} onSubmit={onSubmit} isPending={isPending} error={error} />
              <CreateOrLogin
                head={"Don't have an account?"}
                link={"/register"}
                tail={"Create yours"}
      />
    </div>
  );
}
