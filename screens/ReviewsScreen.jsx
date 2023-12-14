import { View, ActivityIndicator, FlatList, Pressable } from "react-native";
import { useRouter, useSegments } from "expo-router";
import { useMediaReviewsQuery } from "../queries/useMediaReviewsQuery";
import colors from "tailwindcss/colors";
import { CreateReviewBottomSheet, CustomText, Review } from "../components";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRef } from "react";

const ReviewsScreen = ({ id }) => {
  const router = useRouter();
  const reviewSheetRef = useRef(null);

  const segments = useSegments();

  const { data, isLoading } = useMediaReviewsQuery(id);

  if (isLoading) {
    return (
      <View className="h-screen items-center justify-center bg-base">
        <ActivityIndicator size="large" color={colors.teal[500]} />
      </View>
    );
  }

  return (
    <View className="relative flex-1 bg-base p-4">
      {data.reviews.length === 0 ? (
        <View className="flex-1 items-center justify-center bg-base">
          <CustomText variant="h4" className="text-baseLight">
            No reviews yet
          </CustomText>
        </View>
      ) : (
        <FlatList
          data={data.reviews}
          contentContainerStyle={{ gap: 16 }}
          renderItem={({ item }) => {
            return (
              <Pressable onPress={() => router.push(`/reviews/${item.id}`)}>
                <Review item={item} />
              </Pressable>
            );
          }}
          keyExtractor={(item) => item.id + item.score}
        />
      )}
      {!data.userHasReviewed && (
        <Pressable
          onPress={() => reviewSheetRef.current.expand()}
          className="absolute bottom-4 right-4 flex-row items-center justify-center gap-2 rounded-full bg-accentDark px-5 py-3"
        >
          <Ionicons name="star" size={25} color={colors.zinc[200]} />
          <CustomText variant="h5" className="text-light">
            Write
          </CustomText>
        </Pressable>
      )}
      <CreateReviewBottomSheet
        id={id}
        mediaType={segments[1]}
        ref={reviewSheetRef}
      />
    </View>
  );
};

export default ReviewsScreen;
