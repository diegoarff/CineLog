import { Pressable, Image, View } from "react-native";
import { useRouter } from "expo-router";
import CustomText from "./CustomText";
const Film = ({ item }) => {
  const router = useRouter();

  // type item = {
  //   media_type: string;
  //   id: string;
  //   poster: string;
  //   name: string;
  // }

  return (
    <Pressable onPress={() => router.push(`/${item.media_type}/${item.id}`)}>
      <View className=" w-36 overflow-hidden ">
        <Image
          source={{ uri: item.poster }}
          className=" aspect-[2/3] rounded-lg border-[1px] border-baseMedium"
        />
        <CustomText
          variant="body2"
          className="text-baseLight py-2"
          numberOfLines={2}
        >
          {item.name}
        </CustomText>
      </View>
    </Pressable>
  );
};
export default Film;
