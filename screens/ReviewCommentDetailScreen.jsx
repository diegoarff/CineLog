import { View, ActivityIndicator, Pressable, ScrollView } from "react-native";
import colors from "tailwindcss/colors";
import {
  CustomText,
  Review,
  Comment,
  CreateCommentBottomSheet,
} from "../components";
import { useRouter } from "expo-router";
import { useRef } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const ReviewCommentDetailScreen = ({
  type,
  isLoading,
  data,
  comments,
  isLoadingComments,
}) => {
  const router = useRouter();
  const sheetRef = useRef(null);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-base">
        <ActivityIndicator size="large" color={colors.teal[500]} />
      </View>
    );
  }

  return (
    <View className="relative flex-1">
      <ScrollView className="flex-1 bg-base">
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
            <View className="gap-4">
              {comments.map((item) => (
                <Pressable
                  key={item._id}
                  onPress={() => router.push(`/comments/${item._id}`)}
                >
                  <Comment item={item} />
                </Pressable>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
      <Pressable
        onPress={() => sheetRef.current.expand()}
        className="absolute bottom-4 right-4 flex-row items-center justify-center gap-2 rounded-full bg-accentDark px-5 py-3"
      >
        <Ionicons name="chatbubble" size={25} color={colors.zinc[200]} />
        <CustomText variant="h5" className="text-light">
          Write
        </CustomText>
      </Pressable>
      <CreateCommentBottomSheet
        ref={sheetRef}
        type={type}
        isReplyTo={data._id}
      />
    </View>
  );
};

export default ReviewCommentDetailScreen;
