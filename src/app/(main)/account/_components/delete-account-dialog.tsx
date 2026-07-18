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
      <DialogContent className="max-w-lg min-h-[400px] overflow-hidden">
        <div className="p-8 flex flex-col items-center gap-4">
          <div className="relative size-20 mb-2 rounded-full bg-red-100 flex items-center justify-center after:content-[''] after:absolute after:-z-10 after:size-28 after:rounded-full after:bg-red-50">
            <AlertTriangle className="size-10 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-red-500 text-center">
            Are you sure you want to delete your account?
          </h2>
          <p className="text-sm text-gray-500 text-center">
            This action is permanent and cannot be undone.
          </p>
        </div>

        <div className="flex border-t border-gray-200 pt-10">
          <Button
            variant="secondary"
            className="flex-1 h-14 rounded-none text-base"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="flex-1 h-14"
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