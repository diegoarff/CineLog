import { Text } from "react-native";

const CustomText = ({
  variant = "body",
  className,
  numberOfLines,
  onPress,
  children,
}) => {
  const variants = {
    h1: "text-5xl font-interBold",
    h2: "text-4xl font-interBold",
    h3: "text-3xl font-interBold",
    h4: "text-2xl font-interBold",
    h5: "text-xl font-interBold",
    h6: "text-lg font-interSemiBold",
    body: "text-lg font-interRegular",
    body2: "text-base font-interRegular",
    body3: "text-sm font-interRegular",
    caption: "text-sm font-interSemiBold",
    overline: "text-xs font-interRegular",
    chip: "text-xs font-interSemiBold",
    button: "text-base font-interMedium",
  };

  return (
    <Text
      className={`${variants[variant]} ${className}`}
      numberOfLines={numberOfLines}
      onPress={onPress}
      ellipsizeMode="tail"
    >
      {children}
    </Text>
  );
};

export default CustomText;
