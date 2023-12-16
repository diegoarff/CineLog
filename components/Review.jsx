import { View, Image, Pressable } from "react-native";
import React from "react";
import CustomText from "./CustomText";
import colors from "tailwindcss/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

const Review = ({ item, detail }) => {
  const router = useRouter();

  return (
    <View className={`gap-6 ${detail ? "" : "rounded-xl"} bg-baseDark p-4`}>
      <Pressable onPress={() => router.push(`/(app)/user/${item.userId._id}`)}>
        <View className="flex-row items-center gap-3">
          <Image
            source={{ uri: item.userId.avatar }}
            className="aspect-square w-10 rounded-full"
          />
          <CustomText variant="h5" className="text-light" numberOfLines={1}>
            {item.userId.username}
          </CustomText>
          {item.userId.critic && (
            <CustomText
              variant="chip"
              className="rounded-full bg-accentDark px-2 py-1 text-light"
            >
              CRITIC
            </CustomText>
          )}
        </View>
      </Pressable>
      <View className="gap-2">
        <View className="flex-row items-center gap-3">
          <View className="flex-row gap-1">
            {[...Array(5)].map((_, idx) => (
              <Ionicons
                key={idx}
                name="star"
                size={16}
                color={idx < item.score ? colors.amber[500] : colors.zinc[700]}
              />
            ))}
          </View>
          <View>
            <CustomText variant="body2" className="text-baseLight">
              {new Date(item.updatedAt).toLocaleDateString(undefined, {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </CustomText>
          </View>
        </View>
        {item.content && (
          <CustomText className="text-baseLight">{item.content}</CustomText>
        )}
      </View>
    </View>
  );
};

export default Review;
