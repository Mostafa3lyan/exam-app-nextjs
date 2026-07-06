import z from "zod";

export const EmailSchema = z.object({
    email: z.email("Please enter a valid email address"),
});


export const VerifyCodeSchema = z.object({
    code: z.string().min(6, "please enter a valid OTP"),
    email: z.email("Please enter a valid email address"),
});

export const ResetPasswordSchema = z.object({
    newPassword: z.string().min(6, "password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "password must be at least 6 characters long"),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});

export type ForgotPasswordSchemaType = z.infer<typeof EmailSchema>;
export type VerifyCodeSchemaType = z.infer<typeof VerifyCodeSchema>;
export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;