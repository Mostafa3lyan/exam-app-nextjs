"use client";

import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="h-dvh flex justify-center items-center">
      <Spinner className="text-blue-600 size-5" />
    </div>
  )
}
