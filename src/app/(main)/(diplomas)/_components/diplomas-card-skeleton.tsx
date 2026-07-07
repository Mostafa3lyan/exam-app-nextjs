import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DiplomaCardSkeleton() {
  return (
    <Card className="relative overflow-hidden border-0 p-0 rounded-none flex flex-col items-center justify-center">
      {/* Image Skeleton */}
      <Skeleton className="w-full h-[28rem]" />

      {/* Bottom Overlay Skeleton */}
      <div className="absolute bottom-3 w-11/12 h-[5.5rem] bg-primary/10 p-2">
        <Skeleton className="h-6 w-3/4 bg-white/30" />
        <Skeleton className="mt-3 h-4 w-full bg-white/20" />
        <Skeleton className="mt-2 h-4 w-5/6 bg-white/20" />
      </div>
    </Card>
  );
}