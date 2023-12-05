import { Text, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const DetailsScreen = ({ type, id }) => {
  const router = useRouter();

  return (
    <View>
      <Text>DetailsScreen of {id}</Text>
      <Text onPress={() => router.push(`/${type}/${id}/reviews`)}>
        See the reviews
      </Text>
    </View>
  );
};

export default DetailsScreen;

