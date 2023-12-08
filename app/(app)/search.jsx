import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text, TextInput } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
const colors = require("tailwindcss/colors");

const search = () => {
  const router = useRouter();
  return (
    <View className="flex-1 bg-base px-4">
      <View className="mt-9 flex-row items-center gap-5 px-2 pb-4">
        <Ionicons
          name="arrow-back-outline"
          size={25}
          color={colors.zinc[200]}
          onPress={() => router.back()}
          className="mt-4 "
        />
        <TextInput
          className="mt-4 flex-1 text-lg text-baseLight px-4 py-2 rounded-full bg-baseDark"
          placeholder="Search anything..."
          placeholderTextColor={colors.zinc[400]}
          autoFocus={true}
        />
      </View>
      <Text className="text-white">search</Text>
    </View>
  );
};

export default search;
