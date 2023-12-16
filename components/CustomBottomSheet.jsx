import { useMemo, forwardRef } from "react";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import colors from "tailwindcss/colors";
import { Pressable, View } from "react-native";
import CustomText from "./CustomText";

const SheetItem = ({ label, onPress }) => {
  return (
    <Pressable className="border-b border-accentDark p-4" onPress={onPress}>
      <CustomText variant="h6" className="text-baseLight">
        {label}
      </CustomText>
    </Pressable>
  );
};

const CustomBottomSheet = forwardRef(({ title, options, onSelect }, ref) => {
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
          Select {title}
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
      <BottomSheetFlatList
        data={options}
        keyExtractor={(item) => item.value}
        renderItem={({ item }) => (
          <SheetItem
            label={item.label}
            onPress={() => {
              onSelect(item);
              ref.current.close();
            }}
          />
        )}
      />
    </BottomSheet>
  );
});

export default CustomBottomSheet;
