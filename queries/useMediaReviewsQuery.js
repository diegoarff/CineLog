import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getMediaReviews,
  createReview,
  getReview,
  getComments,
  createComment,
  getComment,
} from "../api/functions";

export const useMediaReviewsQuery = (id) => {
  return useQuery({
    queryKey: ["reviews", id],
    queryFn: () => getMediaReviews(id),
  });
};

export const useReviewQuery = (id) => {
  return useQuery({
    queryKey: ["review", id],
    queryFn: () => getReview(id),
  });
};

export const useCommentQuery = (id) => {
  return useQuery({
    queryKey: ["comment", id],
    queryFn: () => getComment(id),
  });
};

export const useCommentsQuery = (type, id) => {
  return useQuery({
    queryKey: ["comments", type, id],
    queryFn: () => getComments(type, id),
  });
};

export const useCreateCommentMutation = () => {
  return useMutation({
    mutationFn: (data) => createComment(data),
    onError: (error) => {
      console.log(
        "🚀 ~ file: useMediaReviewsQuery.js:22 ~ useCreateReviewMutation ~ error:",
        error,
      );
    },
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
