import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";

const ShowDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View>
      <Text>ShowDetails of {id}</Text>
      <Text onPress={() => router.push(`/shows/${id}/reviews`)}>
        See the reviews
      </Text>
    </View>
  );
};

export default ShowDetails;

const styles = StyleSheet.create({});
