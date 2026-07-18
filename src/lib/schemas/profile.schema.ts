import z from "zod";
import { ResetPasswordSchema } from "./forgot-password.schema";


export const ProfileSchema = z.object({
    firstName: z
        .string()
        .nonempty("Please enter your first name")
        .min(2, "First name must be at least 2 characters"),

    lastName: z
        .string()
        .nonempty("Please enter your last name")
        .min(2, "Last name must be at least 2 characters"),

    phone: z
        .string()
        .regex(
            /^(?:\+20|0020|0)?1[0125][0-9]{8}$/,
            "Please enter a valid Egyptian phone number"
        ),
});

export const ChangePasswordSchema = ResetPasswordSchema.extend({
    currentPassword: z
        .string()
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "Password is incorrect"
        ),
});


export const OtpSchema = z.object({
    code: z.string().length(6, "Code must be 6 digits"),
});


export type OtpFields = z.infer<typeof OtpSchema>;
export type ChangePasswordFields = z.infer<typeof ChangePasswordSchema>;
export type ProfileFields = z.infer<typeof ProfileSchema>;