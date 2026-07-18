"use client";
import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        <Spinner className="text-blue-600 size-7" />
    </div>
  );
}
