import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  changeEmailAction,
  changePasswordAction,
  deleteAccountAction,
  requestEmailAction,
  updateProfileAction
} from "../_actions/profile-actions";

export function useUpdateProfile() {
  return useMutation({
    mutationFn: (data: { firstName: string; lastName: string; phone?: string }) =>
      updateProfileAction(data),
    onSuccess: () => {
      toast.success("Profile updated successfully.");
    },
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

export function useRequestChangeEmail() {
  return useMutation({
    mutationFn: (data: { newEmail: string }) =>
      requestEmailAction(data),
  });
}

export function useConfirmChangeEmail() {
  return useMutation({
    mutationFn: (data: { code: string }) =>
      changeEmailAction(data),
  });
}