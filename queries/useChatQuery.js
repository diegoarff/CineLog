import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getChat,
  createChat,
  checkChatExists,
  getUserChats,
} from "../api/functions";

export const useChatQuery = (id) => {
  return useQuery({
    queryKey: ["chat", id],
    queryFn: () => getChat(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 0,
  });
};

export const useCheckChatExistsQuery = (userId) => {
  return useQuery({
    queryKey: ["chatExists", userId],
    queryFn: () => checkChatExists(userId),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 0,
  });
};

export const useUserChatsQuery = () => {
  return useQuery({
    queryKey: ["userChats"],
    queryFn: () => getUserChats(),
    staleTime: 0, // 5 minutes
    gcTime: 0,
  });
};

export const useCreateChatMutation = () => {
  return useMutation({
    mutationFn: (data) => createChat(data),
    onError: (error) => {
      console.log(
        "🚀 ~ file: useChatQuery.js:22 ~ useCreateChatMutation ~ error:",
        error,
      );
    },
  });
};
