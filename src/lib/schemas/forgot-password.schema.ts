import z from "zod";

export const EmailSchema = z.object({
    email: z.email("Please enter a valid email address"),
});


export const VerifyCodeSchema = z.object({
    code: z.string().min(6, "please enter a valid OTP"),
    email: z.email("Please enter a valid email address"),
});

export const ResetPasswordSchema = z.object({
    newPassword: z.string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
    confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});

export type EmailSchemaType = z.infer<typeof EmailSchema>;
export type VerifyCodeSchemaType = z.infer<typeof VerifyCodeSchema>;
export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;