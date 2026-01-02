import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { LoginFields } from "@/lib/types/auth";

export function useLogin() {
    const {isPending,error,mutate} = useMutation({
        mutationFn: async (data: LoginFields) => {
            const res = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            });

            if (!res?.ok) {
                throw new Error("Invalid email or password");
            }

            return res;
        },
        onSuccess:() => {
            const callbackUrl = new URLSearchParams(location.search).get("callbackUrl") || "/";
            window.location.href = callbackUrl;
        }
    });

    return { isPending, error,login:mutate}
}
