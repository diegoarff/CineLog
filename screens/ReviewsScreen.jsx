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
import { CustomText } from "../components";
import Ionicons from "@expo/vector-icons/Ionicons";

const Review = ({ item }) => {
  return (
    <View className="gap-6 rounded-xl bg-baseDark p-4">
      <View className="flex-row items-center gap-3">
        <Image
          source={{ uri: item.user.avatar }}
          className="aspect-square w-10 rounded-full"
        />
        <CustomText variant="h5" className="text-light" numberOfLines={1}>
          {item.user.username}
        </CustomText>
        {item.user.critic && (
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

const ReviewsScreen = ({ id }) => {
  const router = useRouter();

  const { data, isLoading } = useMediaReviewsQuery(id);

  if (isLoading) {
    return (
      <View className="h-screen items-center justify-center bg-base">
        <ActivityIndicator size="large" color={colors.teal[500]} />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-base p-4">
      <FlatList
        data={data}
        contentContainerStyle={{ gap: 16 }}
        renderItem={({ item }) => {
          return (
            <Pressable onPress={() => router.push(`/reviews/${item.id}`)}>
              <Review item={item} />
            </Pressable>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ReviewsScreen;
