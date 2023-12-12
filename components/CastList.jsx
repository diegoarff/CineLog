import { View, FlatList, Image } from "react-native";
import React from "react";
import CustomText from "./CustomText";

const CastItem = ({ item }) => {
  return (
    <View className="w-40 items-center gap-4 rounded-lg bg-baseDark p-4">
      <Image
        source={{
          uri: !item.profile.split("/")[6]
            ? "https://firebasestorage.googleapis.com/v0/b/imgstorage-b6657.appspot.com/o/imgNotFound.png?alt=media&token=3eec4488-078e-4130-a238-36936cb38807"
            : item.profile,
        }}
        className="aspect-square h-28 rounded-full"
      />
      <View className="items-center">
        <CustomText
          variant="button"
          className="text-baseLight"
          numberOfLines={1}
        >
          {item.name}
        </CustomText>
        <CustomText
          variant="body3"
          className="text-accentDark"
          numberOfLines={1}
        >
          {item.character}
        </CustomText>
      </View>
    </View>
  );
};

const CastList = ({ data }) => {
  return (
    <FlatList
      data={data}
      horizontal
      contentContainerStyle={{ gap: 12 }}
      renderItem={({ item }) => <CastItem item={item} />}
      keyExtractor={(item) => item.id + item.name}
    />
  );
};

export default CastList;
