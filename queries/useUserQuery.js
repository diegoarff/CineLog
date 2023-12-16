import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getProfile,
  updateProfile,
  deleteProfile,
  changePassword,
  getUser,
} from "../api/functions";
import { ToastAndroid } from "react-native";

export const useProfileQuery = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getProfile,
    gcTime: 0,
  });
};

export const useUpdateProfileMutation = () => {
  return useMutation({
    mutationFn: (data) => updateProfile(data),
    onError: (error) => {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    },
  });
};

export const useDeleteProfileMutation = () => {
  return useMutation({
    mutationFn: deleteProfile,
    onError: (error) => {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    },
  });
};

export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: (data) => changePassword(data),
    onError: (error) => {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    },
  });
};

export const useUserQuery = (id) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(id),
  });
}
