import z from "zod";

export const ForgotPasswordSchema = z.object({
    email: z.email("Please enter a valid email address"),
});


export const VerifyCodeSchema = z.object({
    resetCode: z.string().min(6, "please enter a valid OTP"),
});

export type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>;
export type VerifyCodeSchemaType = z.infer<typeof VerifyCodeSchema>;