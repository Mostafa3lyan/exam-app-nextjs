import { registerAction } from "@/app/(auth)/register/_actions/register.action";
import { RegisterFields } from "@/lib/types/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useRegister() {
      // Navigation
    const router = useRouter();
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (data: RegisterFields) => {
      return await registerAction(data);
    },
    onSuccess: () => {
      
      router.push('/login');
    },
  });

  return { isPending, error, register: mutate };
}
