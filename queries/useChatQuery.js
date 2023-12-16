import { useQuery } from "@tanstack/react-query";
import { getChat } from "../api/functions";

export const useChatQuery = (id) => {
  return useQuery({
    queryKey: ["chat", id],
    queryFn: () => getChat(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 0,
  });
};
