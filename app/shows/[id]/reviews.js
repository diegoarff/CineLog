import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";

const ShowReviews = () => {
  const { id } = useLocalSearchParams();
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
      <Text>You are seeing the reviews of the show: {id}</Text>
      {reviews.map((review) => (
        <Text
          key={review.id}
          onPress={() => router.push(`/reviews/${review.id}`)}
        >
          {review.title}
        </Text>
      ))}
    </View>
  );
};

export default ShowReviews;

const styles = StyleSheet.create({});
