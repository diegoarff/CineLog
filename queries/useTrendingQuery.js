import { useQuery } from "@tanstack/react-query";
import { getTrending } from "../api/functions";

export const useTrendingQuery = (type, time) => {
  return useQuery({
    queryKey: ["trending", type, time],
    queryFn: () => getTrending(type, time),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
