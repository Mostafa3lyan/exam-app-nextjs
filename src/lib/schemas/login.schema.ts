import z from "zod";

export const LoginSchema = z.object({
    email: z.string().nonempty("Please enter your email").email("Please enter a valid email address"),
    password: z.string().nonempty("please enter your password").min(6, "password must be at least 6 characters long"),
});


export type LoginSchemaType = z.infer<typeof LoginSchema>;