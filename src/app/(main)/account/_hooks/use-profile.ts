import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  changeEmailAction,
  changePasswordAction,
  deleteAccountAction,
  updateProfileAction
} from "../_actions/profile-actions";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { firstName: string; lastName: string; phone?: string }) =>
      updateProfileAction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Profile updated successfully.");
    },
    onError: (error: Error) => toast.error(error.message),
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: (data: { currentPassword: string; newPassword: string }) =>
      changePasswordAction(data),
    onSuccess: () => toast.success("Password updated successfully."),
    onError: (error: Error) => toast.error(error.message),
  });
}

export function useDeleteAccount() {
  return useMutation({
    mutationFn: () => deleteAccountAction(),
    onSuccess: () => toast.success("Account deleted."),
    onError: (error: Error) => toast.error(error.message),
  });
}

export function useChangeEmail() {
  return useMutation({
    mutationFn: (data: { type: "request" | "confirm"; email?: string; code?: string }) =>
      changeEmailAction(data),
    onError: (error: Error) => toast.error(error.message),
  });
}