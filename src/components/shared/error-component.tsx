import { CircleX } from "lucide-react";

export default function ErrorComponent({ errorMessage }: { errorMessage?: string }) {
  if (!errorMessage) return null;

  return (
    <div className="relative rounded-md border border-destructive bg-destructive/10 p-3">
      <CircleX className="absolute -top-2 left-1/2 size-5 -translate-x-1/2 rounded-full bg-background text-destructive" />
      <p className="text-center text-sm text-destructive">{errorMessage}</p>
    </div>
  );
}