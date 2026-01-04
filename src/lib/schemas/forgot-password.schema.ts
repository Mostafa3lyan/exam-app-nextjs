import z from "zod";

export const ForgotPasswordSchema = z.object({
    email: z.email("Please enter a valid email address"),
});


export const VerifyCodeSchema = z.object({
    resetCode: z.string().min(6, "please enter a valid OTP"),
});

export const ResetPasswordSchema = z.object({
    newPassword: z.string().min(6, "password must be at least 6 characters long"),
    confirmNewPassword: z.string().min(6, "password must be at least 6 characters long"),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"]
});

export type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>;
export type VerifyCodeSchemaType = z.infer<typeof VerifyCodeSchema>;
export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;