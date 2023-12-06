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
    default: "bg-teal-500",
    outline: "border border-green-400",
    danger: "bg-red-400",
  };

  return (
    <View className="w-full">
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        <View
          className={`flex h-14 w-full items-center justify-center rounded-full ${variants[variant]}`}
        >
          {loading ? (
            <ActivityIndicator color="#f4f4f5" size="large" />
          ) : (
            <CustomText variant="h5" className="text-zinc-100">
              {label}
            </CustomText>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;
