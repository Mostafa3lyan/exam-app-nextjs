"use client";

import { useEffect, useMemo, useRef } from "react";
import { useDiplomas } from "../_hooks/use-diplomas";
import DiplomaCard from "./diploma-card";
import DiplomaCardSkeleton from "./diplomas-card-skeleton";

const SkeletonGrid = () => (
  <div className="grid grid-cols-3 gap-2.5">
    {Array.from({ length: 6 }).map((_, i) => (
      <DiplomaCardSkeleton key={i} />
    ))}
  </div>
);

export default function DiplomaList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useDiplomas();

  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const diplomas = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data]
  );

  if (isLoading) return <SkeletonGrid />;
  if (isError) return <p className="text-destructive">{error.message}</p>;
  if (diplomas.length === 0) return <p>No diplomas found.</p>;

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {diplomas.map((diploma) => (
          <DiplomaCard key={diploma.id} diploma={diploma} />
        ))}
      </div>

      <div ref={sentinelRef} className="h-10" />

      {isFetchingNextPage && <SkeletonGrid />}

      {!hasNextPage && diplomas.length > 0 && (
        <p className="text-center text-muted-foreground py-4">
          You have reached the end of the list!
        </p>
      )}
    </div>
  );
}