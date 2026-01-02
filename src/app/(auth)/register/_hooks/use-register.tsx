import { registerAction } from "@/lib/actions/register.action";
import { RegisterFields } from "@/lib/types/auth";
import { useMutation } from "@tanstack/react-query";

export function useRegister() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (data: RegisterFields) => {
      return await registerAction(data);
    },
    onSuccess: () => {
      
      window.location.href = "/login";
    },
  });

  return { isPending, error, register: mutate };
}
