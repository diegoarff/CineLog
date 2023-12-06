import { View, TextInput } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useController } from "react-hook-form";
import CustomText from "./CustomText";

const CustomInput = ({
  control,
  icon,
  name,
  rules = {},
  placeholder,
  secureTextEntry = false,
}) => {
  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController({
    control,
    name,
    rules,
  });

  return (
    <View className="border-baseLight relative mb-12 w-full flex-row items-center gap-3 rounded-lg border px-4">
      {icon && <Ionicons name={icon} size={24} color="#a1a1aa" />}
      <TextInput
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#71717a"
        className="text-baseLight w-full py-3 text-lg"
      />
      {error && (
        <CustomText
          variant="body2"
          className="text-error-500 absolute -bottom-8"
        >
          {error.message || "Error"}
        </CustomText>
      )}
    </View>
  );
};

export default CustomInput;
