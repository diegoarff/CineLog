import {
  View,
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { useMediaReviewsQuery } from "../queries/useMediaReviewsQuery";
import colors from "tailwindcss/colors";
import { CreateReviewBottomSheet, CustomText } from "../components";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRef } from "react";

const Review = ({ item }) => {
  return (
    <View className="gap-6 rounded-xl bg-baseDark p-4">
      <View className="flex-row items-center gap-3">
        <Image
          source={{ uri: item.userId.avatar }}
          className="aspect-square w-10 rounded-full"
        />
        <CustomText variant="h5" className="text-light" numberOfLines={1}>
          {item.userId.username}
        </CustomText>
        {item.userId.critic && (
          <CustomText
            variant="chip"
            className="rounded-full bg-accentDark px-2 py-1 text-light"
          >
            CRITIC
          </CustomText>
        )}
      </View>
      <View className="gap-2">
        <View className="flex-row items-center gap-3">
          <View className="flex-row gap-1">
            {[...Array(5)].map((_, idx) => (
              <Ionicons
                key={idx}
                name="star"
                size={16}
                color={idx < item.score ? colors.teal[500] : colors.zinc[700]}
              />
            ))}
          </View>
          <View>
            <CustomText variant="body2" className="text-baseLight">
              {new Date(item.updatedAt).toLocaleDateString(undefined, {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </CustomText>
          </View>
        </View>
        <CustomText className="text-baseLight">{item.content}</CustomText>
      </View>
    </View>
  );
};

const ReviewsScreen = ({ id, haveEdited }) => {
  const router = useRouter();
  const reviewSheetRef = useRef(null);

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
      <CreateReviewBottomSheet id={id} ref={reviewSheetRef} />
    </View>
  );
};

export default ReviewsScreen;
