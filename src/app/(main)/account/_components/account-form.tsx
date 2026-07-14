"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Pencil } from "lucide-react";

import { useUpdateProfile } from "../_hooks/use-profile";
import DeleteAccountDialog from "./delete-account-dialog";
import ChangeEmailDialog from "./change-email-dialog";

import { User } from "@/lib/types/user";


const ProfileSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().optional(),
});

type ProfileFields = z.infer<typeof ProfileSchema>;


export default function AccountForm({ ...user }: User) {
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const [showDelete, setShowDelete] = useState(false);
  const [showEmailChange, setShowEmailChange] = useState(false);

  const form = useForm<ProfileFields>({
    resolver: zodResolver(ProfileSchema),
    values: {
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      phone: user.phone ?? "",
    },
  });


  const onSubmit = (values: ProfileFields) => {
    updateProfile(values);
  };


  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 max-w-3xl"
        >

          {/* First + Last name */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>

                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>

                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>


          {/* Username readonly */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Username
            </label>

            <Input
              value={user.username ?? ""}
              disabled
              className="bg-gray-100"
            />
          </div>


          {/* Email readonly */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">
                Email
              </label>

              <button
                type="button"
                onClick={() => setShowEmailChange(true)}
                className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
              >
                <Pencil className="size-3" />
                Change
              </button>
            </div>

            <Input
              value={user.email ?? ""}
              disabled
            />
          </div>


          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>

                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />


          {/* Actions */}
          <div className="grid grid-cols-2 gap-4">

            <Button
              type="button"
              variant="ghost"
              className="h-14 text-red-500 bg-red-50 hover:bg-red-100 hover:text-red-600"
              onClick={() => setShowDelete(true)}
            >
              Delete My Account
            </Button>


            <Button
              type="submit"
              className="h-14 bg-blue-600 hover:bg-blue-700"
              disabled={isPending}
            >
              {isPending ? "Saving..." : "Save Changes"}
            </Button>

          </div>

        </form>
      </Form>


      <DeleteAccountDialog
        open={showDelete}
        onClose={() => setShowDelete(false)}
      />

      <ChangeEmailDialog
        open={showEmailChange}
        onClose={() => setShowEmailChange(false)}
      />
    </>
  );
}