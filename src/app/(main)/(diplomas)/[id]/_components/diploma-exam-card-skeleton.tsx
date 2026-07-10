import { Skeleton } from "@/components/ui/skeleton";

export default function DiplomaExamCardSkeleton() {
  return (
    <div className="relative flex gap-6 p-6 bg-blue-50 border-2 border-transparent">
      {/* Image Skeleton */}
      <div className="flex-shrink-0">
        <Skeleton className="w-24 h-24 rounded-lg" />
      </div>

      {/* Content Skeleton */}
      <div className="flex-1 min-w-0">
        {/* Title + Metadata */}
        <div className="flex items-center justify-between mb-3">
          <Skeleton className="h-7 w-48" />

          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>

      {/* Floating Button Skeleton */}
      <Skeleton className="absolute right-6 bottom-6 h-10 w-28" />
    </div>
  );
}