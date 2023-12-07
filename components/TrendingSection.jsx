import { ActivityIndicator, View } from "react-native";
import React from "react";
import CustomText from "./CustomText";
import { useRouter } from "expo-router";
import FilmRow from "./FilmRow";
import { useTrendingQuery } from "../queries/useTrendingQuery";

const TrendingSection = ({ title, linkText, linkRoute, type, time }) => {
  const router = useRouter();

  const { data, isLoading } = useTrendingQuery(type, time);

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
      {isLoading ? (
        <ActivityIndicator size="large" color="#14b8a6" />
      ) : (
        <FilmRow data={data} />
      )}
    </View>
  );
};

export default TrendingSection;
