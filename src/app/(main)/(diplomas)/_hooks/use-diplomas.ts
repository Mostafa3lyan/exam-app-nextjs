import { diplomaService } from "@/services/diplomas.service";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useDiplomas(search?: string) {
  return useInfiniteQuery({
    queryKey: ["diplomas", search],
    queryFn: async ({ pageParam = 1 }) => {
      return diplomaService.getAll(pageParam, search);
    },
    getNextPageParam: (lastPage) =>
      lastPage.metadata.page < lastPage.metadata.totalPages
        ? lastPage.metadata.page + 1
        : undefined,
    initialPageParam: 1,
    staleTime: 1000 * 60 * 20,
    gcTime: 1000 * 60 * 25,
  });
}