"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useDeleteAccount } from "../_hooks/use-profile";
import { signOut } from "next-auth/react";

interface DeleteAccountDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function DeleteAccountDialog({ open, onClose }: DeleteAccountDialogProps) {
  const { mutate: deleteAccount, isPending } = useDeleteAccount();

  const handleDelete = () => {
    deleteAccount(undefined, {
      onSuccess: () => signOut({ callbackUrl: "/login" }),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <div className="p-8 flex flex-col items-center gap-4">
          <div className="size-20 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle className="size-10 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-red-500 text-center">
            Are you sure you want to delete your account?
          </h2>
          <p className="text-sm text-gray-500 text-center">
            This action is permanent and cannot be undone.
          </p>
        </div>

        <div className="flex border-t">
          <Button
            variant="ghost"
            className="flex-1 h-14 rounded-none text-base"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="flex-1 h-14 rounded-none text-base bg-red-500 hover:bg-red-600"
            onClick={handleDelete}
            disabled={isPending}
          >
            Yes, delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}