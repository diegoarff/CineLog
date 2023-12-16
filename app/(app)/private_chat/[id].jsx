import {
  View,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import colors from "tailwindcss/colors";
import { CustomText } from "../../../components";
import { useLocalSearchParams } from "expo-router";
import { useChatQuery } from "../../../queries/useChatQuery";
import { useAuth } from "../../../context/AuthContext";
import { useSocket } from "../../../context/SocketContext";
import { Ionicons } from "@expo/vector-icons";

const PrivateChat = () => {
  const { id: chatId } = useLocalSearchParams();
  const { socket } = useSocket();
  const { isUserLoading, userId } = useAuth();

  const scrollViewRef = useRef();

  const [content, setContent] = useState("");
  const [messages, setMessages] = useState([]);

  const { isLoading, data } = useChatQuery(chatId);

  const handleMessageSent = (content) => {
    if (content.length === 0) return;

    const message = {
      content,
      userId,
      chatId,
    };

    socket.emit("send-message", message);
    setMessages((prevMessages) => [
      ...prevMessages,
      { content, userId: { _id: userId } },
    ]);

    setContent("");
  };

  const handleMessageReceived = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  useEffect(() => {
    if (!userId) return;

    socket.emit("join-chat", { chatId, userId });

    socket.on("user-connected", (userId) => {
      console.log("A user connected to the chat: ", userId);
    });

    socket.on("receive-message", handleMessageReceived);

    return () => {
      socket.off("user-connected");
      socket.off("receive-message");
      socket.emit("leave-chat", { chatId, userId });
    };
  }, [userId]);

  useEffect(() => {
    if (!data) return;

    setMessages(data.messages);
  }, [data]);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  if (isUserLoading || isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-base">
        <ActivityIndicator size="large" color={colors.teal[500]} />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-base">
      {/* BODY - MESSAGES */}
      <ScrollView className="flex-1" ref={scrollViewRef}>
        <View className="gap-4 p-4">
          {messages.map((message, index) => {
            const isMe = message.userId._id === userId;

            return (
              <View
                key={index}
                className={`flex-row ${isMe ? "justify-end" : "gap-4"}`}
              >
                <View
                  className={`rounded-lg px-3 py-2 ${
                    isMe ? "bg-accentDark" : "bg-baseDark"
                  }`}
                >
                  <CustomText className="text-light">
                    {message.content}
                  </CustomText>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* FOOTER - TEXTINPUT */}
      <View className="flex-row justify-between bg-baseDark">
        <TextInput
          multiline
          value={content}
          className="h-20 flex-1 px-4 py-2 font-interRegular text-base text-lg text-baseLight"
          placeholder="Type a message..."
          placeholderTextColor={colors.zinc[600]}
          onChangeText={setContent}
        />
        <Pressable
          className="aspect-square items-center justify-center"
          onPress={() => handleMessageSent(content)}
        >
          <Ionicons name="send" color={colors.teal[500]} size={24} />
        </Pressable>
      </View>
    </View>
  );
};

export default PrivateChat;
