import z from "zod";


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

export type ProfileFields = z.infer<typeof ProfileSchema>;