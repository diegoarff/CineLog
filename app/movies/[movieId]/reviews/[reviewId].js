import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const MovieReviewDetails = () => {
  const { movieId, reviewId } = useLocalSearchParams();

  return (
    <View>
      <Text>You are seeing the review with id: {reviewId}</Text>
      <Text>of the movie with id: {movieId}</Text>
    </View>
  );
};

export default MovieReviewDetails;

const styles = StyleSheet.create({});
