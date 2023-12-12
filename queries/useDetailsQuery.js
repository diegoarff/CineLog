import { useQuery } from "@tanstack/react-query";
import { getMedia } from "../api/functions";

export const useDetailsQuery = (type, id) => {
  return useQuery({
    queryKey: [type, id],
    queryFn: () => getMedia(type, id),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
