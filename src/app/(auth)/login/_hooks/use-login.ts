import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LoginFields } from "@/lib/types/auth";

export function useLogin() {
    const router = useRouter();

    const { isPending, error, mutate } = useMutation({
        mutationFn: async (data: LoginFields) => {
            const res = await signIn("credentials", {
                username: data.username,
                password: data.password,
                redirect: false,
            });

            if (!res?.ok) {
                throw new Error("Invalid username or password");
            }

            return res;
        },
        onSuccess: () => {
            const callbackUrl = new URLSearchParams(location.search).get("callbackUrl") || "/";
            router.push(callbackUrl);
        },
    });
console.log(error);

    return { isPending, error, login: mutate };
}