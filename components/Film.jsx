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
      <View
        className={`relative ${big ? "w-56" : "w-[8.725rem]"} overflow-hidden`}
      >
        <Image
          source={{
            uri:
              item.poster.split("w780")[1] === "null"
                ? "https://firebasestorage.googleapis.com/v0/b/imgstorage-b6657.appspot.com/o/imgNotFound.png?alt=media&token=3eec4488-078e-4130-a238-36936cb38807"
                : item.poster,
          }}
          className="aspect-[2/3] rounded-lg border border-baseMedium"
        />
        <CustomText
          variant="body2"
          className="py-2 text-baseLight"
          numberOfLines={2}
        >
          {item.title}
        </CustomText>
        {chip && <MediaTypeChip mediaType={item.media_type} />}
      </View>
    </Pressable>
  );
};
export default Film;
