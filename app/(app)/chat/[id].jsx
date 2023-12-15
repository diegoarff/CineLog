import { ActivityIndicator, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { publicChats } from "../../../utils/publicChats";
import { CustomText } from "../../../components";
import { useEffect, useState } from "react";
import { useSocket } from "../../../context/SocketContext";
import { useAuth } from "../../../context/AuthContext";
import colors from "tailwindcss/colors";

const ChatDetails = () => {
  const { id: chatId } = useLocalSearchParams();
  const { socket } = useSocket();
  const { isUserLoading, userId } = useAuth();

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!userId) return;

    socket.emit("join-chat", { chatId, userId });

    socket.on("user-connected", (userId) => {
      console.log("A user connected to the chat: ", userId);
    });

    return () => {
      socket.off("user-connected");
      socket.emit("leave-chat", { chatId, userId });
    };
  }, [userId]);

  if (isUserLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-base">
        <ActivityIndicator size="large" color={colors.teal[500]} />
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: publicChats.find((chat) => chat.chatId === chatId).name,
        }}
      />
      <View className="relative flex-1 bg-base p-4 pb-0">
        <CustomText className="text-baseLight">
          ChatDetails of chat: {chatId}
        </CustomText>
      </View>
    </>
  );
};

export default ChatDetails;
