import { useInfiniteQuery } from "@tanstack/react-query";
import { getSearch } from "../api/functions";

export const useSearchQuery = (query) => {
  return useInfiniteQuery({
    queryKey: ["search", query],
    queryFn: ({ pageParam = 1 }) => {
      if (query && query.length > 0) {
        return getSearch(query, pageParam);
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    getNextPageParam: (lastPage) => {
      if (lastPage?.page < lastPage?.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });
};
