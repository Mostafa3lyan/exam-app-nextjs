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
    mutationFn: (data: { currentPassword: string; newPassword: string; confirmPassword: string }) =>
      changePasswordAction(data),
    onSuccess: () => toast.success("Password changed successfully."),
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
    onSuccess: () => toast.success("OTP sent successfully."),
  });
}

export function useConfirmChangeEmail() {
  return useMutation({
    mutationFn: (data: { code: string }) =>
      changeEmailAction(data),
    onSuccess: () => toast.success("Email changed successfully."),
  });
}