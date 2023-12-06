import { Text } from "react-native";

const CustomText = ({ variant = "body", className, children }) => {
  const variants = {
    h1: "text-5xl font-interBold",
    h2: "text-4xl font-interBold",
    h3: "text-3xl font-interBold",
    h4: "text-2xl font-interBold",
    h5: "text-xl font-interBold",
    h6: "text-lg font-interBold",
    body: "text-lg font-interRegular",
    body2: "text-base font-interRegular",
    body3: "text-sm font-interRegular",
    caption: "text-xs font-interRegular",
    overline: "text-xs font-interRegular",
    button: "text-base font-interMedium",
  };

  return (
    <Text className={`${variants[variant]} ${className}`}>
      {children}
    </Text>
  );
};

export default CustomText;
