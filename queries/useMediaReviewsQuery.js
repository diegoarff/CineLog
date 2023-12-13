import { useQuery } from "@tanstack/react-query";
import { getMediaReviews } from "../api/functions";

export const useMediaReviewsQuery = (id) => {
  return useQuery({
    queryKey: ["reviews", id],
    queryFn: () => getMediaReviews(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
