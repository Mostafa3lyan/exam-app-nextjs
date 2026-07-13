import { useMutation } from "@tanstack/react-query";
import { submitExamAction, SubmitExamPayload } from "../_actions/submit-exam.action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useSubmitExam() {
  const router = useRouter();

  const { mutate, isPending, error } = useMutation({
    mutationFn: async (data: SubmitExamPayload) => await submitExamAction(data),
    onSuccess: (data) => {
      toast.success("Exam submitted successfully!");
      router.push(`/submissions/${data.payload.id}`);
    },
  });

  return { submitExam: mutate, isPending, error };
}