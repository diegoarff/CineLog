import { useState } from "react";
import {
  View,
  Image,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { publicChats } from "../../../utils/publicChats";
import { CustomText } from "../../../components";
import { useRouter } from "expo-router";
import { useUserChatsQuery } from "../../../queries/useChatQuery";
import colors from "tailwindcss/colors";
import { useAuth } from "../../../context/AuthContext";

const ChatCard = ({ item }) => {
  return (
    <View className="relative overflow-hidden rounded-xl border border-accentDark">
      <Image source={{ uri: item.backdrop }} className="aspect-video" />
      <Image
        source={require("../../../assets/backdrop.png")}
        className="absolute bottom-0 left-0 aspect-video opacity-90"
      />
      <CustomText variant="h6" className="absolute bottom-2 left-4 text-light">
        {item.name}
      </CustomText>
    </View>
  );
};

const PrivateChatItem = ({ item, userId }) => {
  return (
    <View className="rounded-lg border border-accentDark p-4">
      {item.usersId.map((user, idx) => {
        if (user._id === userId) return null;

        return (
          <View className="flex-row items-center gap-3" key={idx}>
            <Image
              source={{ uri: user.avatar }}
              className="aspect-square w-10 rounded-full"
            />
            <CustomText variant="h5" className="text-light" numberOfLines={1}>
              {user.username}
            </CustomText>
            {user.critic && (
              <CustomText
                variant="chip"
                className="rounded-full bg-accentDark px-2 py-1 text-light"
              >
                CRITIC
              </CustomText>
            )}
          </View>
        );
      })}
    </View>
  );
};

const Chat = () => {
  const router = useRouter();
  const { isLoading, data } = useUserChatsQuery();
  const { isUserLoading, userId } = useAuth();

  const [selectedTab, setSelectedTab] = useState("community");

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  if (isLoading || isUserLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-base">
        <ActivityIndicator size="large" color={colors.teal[500]} />
      </View>
    );
  }

  return (
    <View className="flex-1">
      <View className="flex-row justify-around bg-base py-4">
        <Pressable onPress={() => handleTabChange("community")}>
          <CustomText
            variant="h6"
            className={`rounded-full border px-4 py-2 ${
              selectedTab === "community"
                ? "border-accent text-accent"
                : "border-baseLight text-baseLight"
            }`}
          >
            Community
          </CustomText>
        </Pressable>
        <Pressable onPress={() => handleTabChange("private")}>
          <CustomText
            variant="h6"
            className={`rounded-full border px-4 py-2 ${
              selectedTab === "private"
                ? "border-accent text-accent"
                : "border-baseLight text-baseLight"
            }`}
          >
            Private
          </CustomText>
        </Pressable>
      </View>
      <ScrollView className="flex-1 bg-base p-4">
        {selectedTab === "community" ? (
          <View className="flex-row flex-wrap gap-4">
            {publicChats.map((item) => (
              <Pressable
                className="w-[48%]"
                onPress={() => router.push(`/chat/${item.chatId}`)}
                key={item.chatId}
              >
                <ChatCard item={item} />
              </Pressable>
            ))}
          </View>
        ) : data.length > 0 ? (
          <View className="gap-4">
            {data.map((chat, idx) => {
              return (
                <Pressable
                  className="w-full"
                  onPress={() => router.push(`/private_chat/${chat._id}`)}
                  key={idx}
                >
                  <PrivateChatItem item={chat} userId={userId} />
                </Pressable>
              );
            })}
          </View>
        ) : (
          <View className="flex-1 items-center justify-center">
            <CustomText variant="h5" className="text-baseLight">
              No private chats
            </CustomText>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Chat;
