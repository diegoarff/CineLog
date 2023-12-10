import { Pressable, Image, View } from "react-native";
import { useRouter } from "expo-router";
import CustomText from "./CustomText";

const MediaTypeChip = ({ mediaType }) => {
  const type = mediaType === "tv" ? "TV Show" : "Movie";
  return (
    <View className={`absolute left-2 top-2 rounded-full bg-accent px-2 py-1`}>
      <CustomText variant="chip" className="text-white">
        {type}
      </CustomText>
    </View>
  );
};

const Film = ({ item, chip, big }) => {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.push(`/${item.media_type}/${item.id}`)}>
      <View className={`relative ${big ? "w-56" : "w-[8.725rem]"} overflow-hidden`}>
        <Image
          source={{ uri: item.poster }}
          className="aspect-[2/3] rounded-lg border-[1px] border-baseMedium"
        />
        <CustomText
          variant="body2"
          className="py-2 text-baseLight"
          numberOfLines={2}
        >
          {item.name}
        </CustomText>
        {chip && <MediaTypeChip mediaType={item.media_type} />}
      </View>
    </Pressable>
  );
};
export default Film;
