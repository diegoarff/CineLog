import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import CustomText from "./CustomText";
const colors = require("tailwindcss/colors");

const SearchBar = () => {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.push("/(app)/search")}>
      <View className="w-full flex-row items-center gap-4 rounded-full bg-baseDark px-3 py-2">
        <Ionicons name="search-outline" size={24} color={colors.zinc[400]} />
        <CustomText variant="body2" className="text-baseLight">
          Search anything...
        </CustomText>
      </View>
    </Pressable>
  );
};

export default SearchBar;
