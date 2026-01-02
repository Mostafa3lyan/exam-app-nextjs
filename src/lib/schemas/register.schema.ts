import { z } from "zod";

export const RegisterSchema = z
    .object({
        username: z
            .string()
            .min(3, "Username must be at least 3 characters")
            .max(20, "Username must be at most 20 characters")
            .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),

        firstName: z
            .string()
            .min(2, "First name must be at least 2 characters"),

        lastName: z
            .string()
            .min(2, "Last name must be at least 2 characters"),

        email: z
            .email("Please enter a valid email address"),

        phone: z
            .string()
            .regex(
                /^(?:\+20|0020|0)?1[0125][0-9]{8}$/,
                "Please enter a valid Egyptian phone number"
            ),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
            .regex(/[a-z]/, "Password must contain at least one lowercase letter")
            .regex(/[0-9]/, "Password must contain at least one number")
            .regex(/[@$!%*?&]/, "Password must contain at least one special character"),

        rePassword: z.string(),
    })
    .refine((value) => value.password === value.rePassword, {
        path: ["rePassword"],
        message: "Passwords do not match",
    });


export type RegisterSchemaType = z.infer<typeof RegisterSchema>;