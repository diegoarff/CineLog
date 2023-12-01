import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";

const MovieDetails = () => {
  const { movieId } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View>
      <Text>MovieDetails of {movieId}</Text>

      <Text onPress={() => router.push(`/movies/${movieId}/reviews`)}>
        See reviews
      </Text>
    </View>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({});
