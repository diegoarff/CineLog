import {
  ScrollView,
  ActivityIndicator,
  View,
  ToastAndroid,
  Image,
  Alert,
  Pressable,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  useProfileQuery,
  useChangePasswordMutation,
  useDeleteProfileMutation,
  useUpdateProfileMutation,
} from "../../queries/useUserQuery";
import { useForm } from "react-hook-form";
import {
  CustomButton,
  CustomInput,
  CustomText,
  AvatarChooseBottomSheet,
} from "../../components";
import colors from "tailwindcss/colors";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const profile = () => {
  const { onLogout } = useAuth();
  const { data, isLoading } = useProfileQuery();
  const [avatar, setAvatar] = useState(
    "https://firebasestorage.googleapis.com/v0/b/ramble-322a6.appspot.com/o/test%2F1698975678282.jpeg?alt=media&token=c9a7b759-be64-4a3e-aa5b-b932c7b7159f",
  );
  const sheetRef = useRef(null);

  const queryClient = useQueryClient();
  const router = useRouter();

  const updateProfileMutation = useUpdateProfileMutation();
  const changePasswordMutation = useChangePasswordMutation();
  const deleteProfileMutation = useDeleteProfileMutation();

  const {
    control: profileControl,
    handleSubmit: profileHandleSubmit,
    reset,
  } = useForm();

  const {
    control: passwordControl,
    handleSubmit: passwordHandleSubmit,
    watch,
  } = useForm();

  const pwd = watch("newPassword");

  const handleUpdateProfile = (formData) => {
    updateProfileMutation.mutate(
      { username: formData.username, avatar },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["me"] });
          ToastAndroid.show("Profile updated succesfully", ToastAndroid.SHORT);
          router.replace("/(tabs)/home");
        },
      },
    );
  };

  const handleChangePassword = (formData) => {
    changePasswordMutation.mutate(formData, {
      onSuccess: () => {
        ToastAndroid.show("Password changed succesfully", ToastAndroid.SHORT);
        router.replace("/(tabs)/home");
      },
    });
  };

  const handleDeleteProfile = () => {
    Alert.alert(
      "Delete account",
      "Are you sure you want to delete your account?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteProfileMutation.mutate(null, {
              onSuccess: () => {
                ToastAndroid.show(
                  "Account deleted succesfully",
                  ToastAndroid.SHORT,
                );
                onLogout();
              },
            });
          },
        },
      ],
    );
  };

  useEffect(() => {
    reset({
      username: data?.username,
    });
    setAvatar(data?.avatar);
  }, [isLoading, data]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-base">
        <ActivityIndicator color={colors.teal[500]} size="large" />
      </View>
    );
  }

  return (
    <ScrollView className=" bg-base ">
      <View className="flex-1 gap-8 bg-base p-4">
        <View>
          <CustomText variant="h4" className="mb-2 text-accent">
            Update your profile
          </CustomText>
          <CustomText variant="body" className="mb-4 text-baseLight">
            You can change your username and avatar here
          </CustomText>
          <View className="mt-4 items-center">
            <View className="relative">
              <Image
                source={{ uri: avatar }}
                className="mb-6 aspect-square w-36 rounded-full"
              />
              <Pressable
                className="absolute right-0 top-0 aspect-square w-12 items-center justify-center rounded-full bg-accent"
                onPress={() => {
                  sheetRef.current.expand();
                }}
              >
                <Ionicons name="pencil" size={24} color={colors.zinc[200]} />
              </Pressable>
            </View>
            <CustomInput
              name="username"
              placeholder="Username"
              icon="person-outline"
              rules={{
                required: "Username  is required",
                minLength: { value: 2, message: "Minimum length is 2" },
              }}
              control={profileControl}
            />
            <CustomButton
              label="Update profile"
              disabled={updateProfileMutation.isPending}
              onPress={profileHandleSubmit(handleUpdateProfile)}
            />
          </View>
        </View>
        <View>
          <CustomText variant="h4" className="mb-2 text-accent">
            Change your password
          </CustomText>
          <CustomText variant="body" className="mb-4 text-baseLight">
            You can change your password here
          </CustomText>
          <View className="mt-4">
            <CustomInput
              name="oldPassword"
              icon="lock-closed-outline"
              rules={{
                required: "Password is required",
                minLength: { value: 8, message: "Minimum length is 8" },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*\d).+$/,
                  message: "At least 1 uppercase and 1 number is required",
                },
              }}
              placeholder="Old password"
              secureTextEntry
              control={passwordControl}
            />
            <CustomInput
              name="newPassword"
              icon="lock-closed-outline"
              rules={{
                required: "Password is required",
                minLength: { value: 8, message: "Minimum length is 8" },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*\d).+$/,
                  message: "At least 1 uppercase and 1 number is required",
                },
              }}
              placeholder="New password"
              secureTextEntry
              control={passwordControl}
            />
            <CustomInput
              name="confirmNewPassword"
              icon="lock-closed-outline"
              rules={{
                required: "Password is required",
                minLength: { value: 8, message: "Minimum length is 8" },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*\d).+$/,
                  message: "At least 1 uppercase and 1 number is required",
                },
                validate: (value) => {
                  return value === pwd || "Password does not match";
                },
              }}
              placeholder="Confirm new password"
              secureTextEntry
              control={passwordControl}
            />
            <CustomButton
              label="Change password"
              disabled={updateProfileMutation.isPending}
              onPress={passwordHandleSubmit(handleChangePassword)}
            />
          </View>
        </View>
        <View>
          <CustomText variant="h4" className="mb-2 text-accent">
            Account
          </CustomText>

          <View className="mt-4 gap-8">
            <CustomButton label="Logout" onPress={onLogout} variant="outline" />
            <View className="gap-4">
              <CustomButton
                label="Delete account"
                onPress={handleDeleteProfile}
                variant="danger"
              />
              <CustomText variant="h6" className="mb-2 text-baseMedium">
                WARNING! Deleting your account will erase all your reviews and
                comments from the application. This action is irreversible.
              </CustomText>
            </View>
          </View>
        </View>
      </View>
      <AvatarChooseBottomSheet
        ref={sheetRef}
        selectedAvatar={avatar}
        onAvatarSelection={(avatar) => setAvatar(avatar)}
      />
    </ScrollView>
  );
};

export default profile;
