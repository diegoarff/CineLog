import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";

const MovieReviews = () => {
  const { movieId } = useLocalSearchParams();
  const router = useRouter();

  const reviews = [
    {
      id: 1,
      title: "Great movie!",
    },
    {
      id: 2,
      title: "I loved it!",
    },
    {
      id: 3,
      title: "Not so good...",
    },
  ];

  return (
    <View>
      <Text>You are seeing the reviews of the movie: {movieId}</Text>
      {reviews.map((review) => (
        <Text
          key={review.id}
          onPress={() => router.push(`/movies/${movieId}/reviews/${review.id}`)}
        >
          {review.title}
        </Text>
      ))}
    </View>
  );
};

export default MovieReviews;

const styles = StyleSheet.create({});
