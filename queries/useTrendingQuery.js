import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { getTrending, getTrendingPaginated } from "../api/functions";

export const useTrendingQuery = (type, time) => {
  return useQuery({
    queryKey: ["trending", type, time],
    queryFn: () => getTrending(type, time),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useTrendingPaginatedQuery = (type, time) => {
  return useInfiniteQuery({
    queryKey: ["trending", "paginated", type, time],
    queryFn: ({ pageParam = 1 }) => {
      return getTrendingPaginated(type, time, pageParam);
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
