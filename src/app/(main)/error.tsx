// app/error.tsx
"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCw, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md">
        <Card>
          <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
            <div className="relative flex size-20 items-center justify-center rounded-full bg-red-100 after:absolute after:-z-10 after:size-36 after:rounded-full after:bg-red-50 after:content-['']">
              <AlertTriangle className="size-10 text-red-500" />
            </div>

            <div className="space-y-1">
              <h1 className="text-3xl font-inter font-semibold">
                Something went wrong
              </h1>
            </div>

            <p className="text-sm text-muted-foreground">
              An unexpected error occurred. You can try again, or head back
              to the homepage.
            </p>

            {error.digest && (
              <p className="text-xs text-muted-foreground/70">
                Error reference: {error.digest}
              </p>
            )}

            <div className="flex w-full flex-col gap-3 mt-2 sm:flex-row">
              <Button
                variant="secondary"
                className="flex-1 h-14 text-base"
                onClick={() => reset()}
              >
                <RotateCw />
                Try again
              </Button>

              <Button asChild className="flex-1 h-14 text-base">
                <Link href="/">
                  <Home />
                  Go home
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}