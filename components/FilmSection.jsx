import { View } from "react-native";
import React from "react";
import CustomText from "./CustomText";
import { useRouter } from "expo-router";
import FilmRow from "./FilmRow";

const FilmSection = ({ rowData, title, linkText, linkRoute }) => {
  const router = useRouter();

  return (
    <View className="gap-4">
      <View className="flex-row items-center justify-between">
        <CustomText variant="h4" className="text-light">
          {title}
        </CustomText>
        <CustomText
          className="text-accent"
          onPress={() => router.push(linkRoute)}
        >
          {linkText}
        </CustomText>
      </View>
      <FilmRow data={rowData} />
    </View>
  );
};

export default FilmSection;
