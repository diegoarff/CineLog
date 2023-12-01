import { View, Text } from "react-native";
import { useRouter } from "expo-router";

const ReviewsScreen = ({ id }) => {
  const router = useRouter();

  // Reviews should be loaded from API based on id
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
      <Text>You are seeing the reviews of the production : {id}</Text>
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

export default ReviewsScreen;
