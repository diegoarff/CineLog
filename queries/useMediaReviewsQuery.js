import { useQuery, useMutation } from "@tanstack/react-query";
import { getMediaReviews, createReview } from "../api/functions";

export const useMediaReviewsQuery = (id) => {
  return useQuery({
    queryKey: ["reviews", id],
    queryFn: () => getMediaReviews(id),
  });
};

export const useCreateReviewMutation = () => {
  return useMutation({
    mutationFn: (data) => createReview(data),
    onError: (error) => {
      console.log(
        "🚀 ~ file: useMediaReviewsQuery.js:22 ~ useCreateReviewMutation ~ error:",
        error,
      );
    },
  });
};
