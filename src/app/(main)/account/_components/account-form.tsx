"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Pencil } from "lucide-react";
import { useUpdateProfile } from "../_hooks/use-profile";
import ChangeEmailDialog from "./change-email-dialog";
import DeleteAccountDialog from "./delete-account-dialog";
import { ProfileFields, ProfileSchema } from "@/lib/schemas/profile.schema";
import { User } from "@/lib/types/user";
import ErrorComponent from "@/components/shared/error-component";
import { PhoneInput } from "@/components/ui/phone-input";



export default function AccountForm({ ...user }: User) {
  const { mutate: updateProfile, isPending, error } = useUpdateProfile();

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
          className="flex flex-col ms-2 sm:ms-14 gap-6 max-w-3xl px-4 sm:px-0"
        >

          {/* First + Last name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <label className="text-sm font-medium">
                Email
              </label>

              <button
                type="button"
                onClick={() => setShowEmailChange(true)}
                className="flex items-center gap-1 text-sm text-blue-600 hover:underline w-fit"
              >
                <Pencil className="size-3" />
                Change
              </button>
            </div>

            <Input
              value={user.email ?? ""}
              readOnly
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
                  <PhoneInput defaultCountry="EG" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <ErrorComponent errorMessage={error?.message} />

          {/* Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

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
              className="h-14"
              disabled={isPending || !form.formState.isDirty}
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