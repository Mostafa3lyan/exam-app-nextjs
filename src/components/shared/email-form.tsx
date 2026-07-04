"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { MoveRight } from "lucide-react";
import ErrorComponent from "./error-component";

interface EmailFormProps {
  title: string;
  description?: string;
  form: UseFormReturn<{ email: string }>;
  onSubmit: (data: { email: string }) => void;
  isPending: boolean;
  error?: Error | null;
}

export default function EmailForm({
  title,
  description,
  form,
  onSubmit,
  isPending,
  error,
}: EmailFormProps) {
  return (
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-inter">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          autoFocus
                          placeholder="m@example.com"
                          autoComplete="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {error && <ErrorComponent errorMessage={error?.message} />
                }

                <Button
                  type="submit"
                  className="w-full"
                  disabled={
                    isPending ||
                    (!form.formState.isValid && form.formState.isSubmitted)
                  }
                >
                  {isPending ? "Sending..." : "Next"}
                  <MoveRight />
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
  );
}