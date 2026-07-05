import z from "zod";

export const LoginSchema = z.object({
    username: z.string().nonempty("Please enter your username"),
    password: z.string().nonempty("please enter your password").min(6, "password must be at least 6 characters long"),
});


export type LoginSchemaType = z.infer<typeof LoginSchema>;