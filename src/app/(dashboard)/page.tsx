"use client"
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

// app/(home)/page.tsx
export default function HomePage() {
  return (
    <>
      <h1>Welcome to Exam App</h1>
      <Button onClick={() => signOut() } >logout</Button>
    </>
  );
}
