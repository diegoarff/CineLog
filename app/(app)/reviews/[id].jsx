import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";

const ReviewDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View>
      <Text>You are seeing the review with id: {id}</Text>
      <Text>Comments should also be loaded here</Text>
      <Text onPress={() => router.push(`/comments/2`)}>Go to comment 2</Text>
    </View>
  );
};

export default ReviewDetails;

const styles = StyleSheet.create({});
