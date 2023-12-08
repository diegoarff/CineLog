import Ionicons from "@expo/vector-icons/Ionicons";
import { View, TextInput, Text, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { useDebounce } from "../../hooks/useDebounce";
import { useSearchQuery } from "../../queries/useSearchQuery";
import { FilmGrid } from "../../components";
const colors = require("tailwindcss/colors");

const search = () => {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 800);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSearchQuery(debouncedSearchQuery);

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <View className="flex-1 bg-base">
      <View className="px-4">
        <View className="mt-9 flex-row items-center gap-5 px-2 pb-4">
          <Ionicons
            name="arrow-back-outline"
            size={25}
            color={colors.zinc[200]}
            onPress={() => router.replace("/(tabs)/discover")}
            className="mt-4 "
          />
          <TextInput
            className="mt-4 flex-1 rounded-full bg-baseDark px-4 py-2 text-lg text-baseLight"
            onChangeText={(text) => setSearchQuery(text)}
            value={searchQuery}
            placeholder="Search anything..."
            placeholderTextColor={colors.zinc[400]}
            autoFocus={true}
          />
        </View>
      </View>
      {isLoading && (
        <ActivityIndicator
          size="large"
          color={colors.teal[400]}
          className="mt-20"
        />
      )}

      {!isLoading && data.pages[0] && (
        <FilmGrid
          data={data}
          loadMore={loadMore}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </View>
  );
};

export default search;
