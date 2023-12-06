import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import React from "react";
import CustomText from "./CustomText";

const CustomButton = ({
  label,
  variant = "default",
  onPress,
  disabled,
  loading,
}) => {
  const variants = {
    default: "bg-green-400",
    outline: "border border-green-400",
    danger: "bg-red-400",
  };

  return (
    <View className="w-full">
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        <View
          className={`flex w-full items-center justify-center rounded-full h-14 ${variants[variant]}`}
        >
          {loading ? (
            <ActivityIndicator color="#18181b" size="large"/>
          ) : (
            <CustomText variant="h5" className="text-zinc-900">
              {label}
            </CustomText>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;
