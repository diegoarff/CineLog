import { useLocalSearchParams, useRouter } from "expo-router";
import { View, ActivityIndicator, Image, Pressable } from "react-native";
import { useUserQuery } from "../../../queries/useUserQuery";
import colors from "tailwindcss/colors";
import { CustomText } from "../../../components";
import { Ionicons } from "@expo/vector-icons";
import {
  useCreateChatMutation,
  useCheckChatExistsQuery,
} from "../../../queries/useChatQuery";
import { useQueryClient } from "@tanstack/react-query";

const UserDetails = () => {
  const { id } = useLocalSearchParams();

  const router = useRouter();
  const { isLoading, data } = useUserQuery(id);

  const createChatMutation = useCreateChatMutation();

  const queryClient = useQueryClient();

  const { isLoading: isCheckLoading, data: chatExists } =
    useCheckChatExistsQuery(id);

  const handleChatCreate = async () => {
    createChatMutation.mutate(
      { userId: id },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: ["userChats"] });
          router.push(`/(app)/private_chat/${data._id}`);
        },
      },
    );
  };

  if (isLoading || isCheckLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-base">
        <ActivityIndicator size="large" color={colors.teal[500]} />
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center gap-8 bg-base p-4">
      <View className="items-center gap-4">
        <Image
          source={{ uri: data.avatar }}
          className="aspect-square w-48 rounded-full"
        />

        <View className="items-center justify-center gap-4">
          <CustomText variant="h2" className="text-light" numberOfLines={1}>
            {data.username}
          </CustomText>
          {data.critic && (
            <CustomText
              variant="button"
              className="rounded-full bg-accentDark px-4 py-1 text-light"
            >
              CRITIC
            </CustomText>
          )}
        </View>
      </View>
      {chatExists === "false" && (
        <Pressable
          onPress={handleChatCreate}
          disabled={createChatMutation.isPending}
          className="w-56 flex-row justify-center gap-4 rounded-full border border-accentDark py-4"
        >
          <CustomText variant="h6" className="text-light">
            Start a chat
          </CustomText>
          <Ionicons name="chatbubble" size={24} color={colors.zinc[200]} />
        </Pressable>
      )}
    </View>
  );
};

export default UserDetails;
