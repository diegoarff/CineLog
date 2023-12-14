import { View, ActivityIndicator, Pressable, FlatList } from "react-native";
import colors from "tailwindcss/colors";
import { CustomText, Review, Comment } from "../components";
import { useRouter } from "expo-router";

const ReviewCommentDetailScreen = ({
  type,
  isLoading,
  data,
  comments,
  isLoadingComments,
}) => {
  const router = useRouter();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-base">
        <ActivityIndicator size="large" color={colors.teal[500]} />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-base">
      {type === "review" ? (
        <Review item={data} detail />
      ) : (
        <Comment item={data} detail />
      )}
      <CustomText variant="h5" className="bg-accentDark px-4 py-3 text-light">
        Comments
      </CustomText>
      <View className="flex-1 p-4">
        {isLoadingComments ? (
          <View className="flex-1 items-center justify-center bg-base">
            <ActivityIndicator size="large" color={colors.teal[500]} />
          </View>
        ) : comments.length === 0 ? (
          <View className="flex-1 items-center justify-center bg-base">
            <CustomText variant="h4" className="text-baseLight">
              No comments yet
            </CustomText>
          </View>
        ) : (
          <FlatList
            data={comments}
            contentContainerStyle={{ gap: 16 }}
            renderItem={({ item }) => {
              return (
                <Pressable onPress={() => router.push(`/comments/${item._id}`)}>
                  <Comment item={item} />
                </Pressable>
              );
            }}
            keyExtractor={(item) => item._id}
          />
        )}
      </View>
    </View>
  );
};

export default ReviewCommentDetailScreen;
