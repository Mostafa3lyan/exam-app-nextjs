"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileQuestion, MoveRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md">
        <Card>
          <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
            <div className="relative flex size-20 items-center justify-center rounded-full bg-blue-100 after:absolute after:-z-10 after:size-36 after:rounded-full after:bg-blue-50 after:content-['']">
              <FileQuestion className="size-10 text-blue-600" />
            </div>

            <div className="space-y-1">
              <h1 className="text-3xl font-inter font-semibold">404</h1>
              <h2 className="text-lg font-medium">Page not found</h2>
            </div>

            <p className="text-sm text-muted-foreground">
              The page you&apos;re looking for doesn&apos;t exist or may have been moved.
            </p>

            <Button asChild className="w-full h-14 text-base mt-2">
              <Link href="/">
                Back to Home
                <MoveRight />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}