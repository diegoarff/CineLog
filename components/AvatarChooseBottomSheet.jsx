import { View, Pressable, Image } from "react-native";
import React, { forwardRef, useMemo } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import colors from "tailwindcss/colors";
import CustomText from "./CustomText";
import { avatars } from "../utils/avatars";

const AvatarChooseBottomSheet = forwardRef(
  ({ selectedAvatar, onAvatarSelection }, ref) => {
    const snapPoints = useMemo(() => ["100%"], []);

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        enablePanDownToClose
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: "#10181f" }}
        handleIndicatorStyle={{ backgroundColor: colors.teal[800] }}
      >
        <View className="flex-row items-center justify-between px-3 py-2">
          <CustomText variant="h4" className="text-accentDark">
            Select avatar
          </CustomText>
          <Pressable
            onPress={() => ref.current.close()}
            className="rounded-full bg-accentDark px-3 py-2"
          >
            <CustomText variant="caption" className="text-zinc-300">
              Close
            </CustomText>
          </Pressable>
        </View>

        <View className="flex-1 flex-row flex-wrap justify-evenly px-3 pb-6 pt-2 gap-4">
          {avatars.map((avatar) => (
            <Pressable
              key={avatar.id}
              onPress={() => {
                onAvatarSelection(avatar.url);
                ref.current.close();
              }}
              className={`aspect-square w-40 rounded-full ${
                selectedAvatar === avatar.url
                  ? "border-4 border-accent"
                  : "border-2 border-baseLight"
              }`}
            >
              <View className="flex-1">
                <Image
                  source={{ uri: avatar.url }}
                  className="aspect-square rounded-full"
                />
              </View>
            </Pressable>
          ))}
        </View>
      </BottomSheet>
    );
  },
);

export default AvatarChooseBottomSheet;
