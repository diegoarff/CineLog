import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getProfile,
  updateProfile,
  deleteProfile,
  changePassword,
} from "../api/functions";
import { ToastAndroid } from "react-native";

export const useUserQuery = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getProfile,
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
