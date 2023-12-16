import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";
const colors = require("tailwindcss/colors");

const ProfileIcon = ({className}) => {

  const router = useRouter();

  return (
    <Pressable onPress={() => router.push('/(app)/profile')} className={`aspect-square h-12 items-center justify-center rounded-full bg-baseDark ${className}`}>
      <Ionicons
        name="person-circle-outline"
        size={32}
        color={colors.zinc[200]}
      />
    </Pressable>
  );
};

export default ProfileIcon;
