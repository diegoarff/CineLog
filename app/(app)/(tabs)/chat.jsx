import { View, Image, ScrollView, Pressable } from "react-native";
import { publicChats } from "../../../utils/publicChats";
import { CustomText } from "../../../components";
import { useRouter } from "expo-router";

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

const Chat = () => {
  const router = useRouter();
  return (
    <ScrollView className="flex-1 bg-base p-4">
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
    </ScrollView>
  );
};

export default Chat;
