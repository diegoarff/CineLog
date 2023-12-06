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
    <View
      className={`relative mb-12 w-full flex-row items-center gap-3 rounded-lg border px-4 ${
        error ? "border-red-500" : "border-zinc-400"
      }`}
    >
      {icon && (
        <Ionicons name={icon} size={24} color={error ? "#ef4444" : "#a1a1aa"} />
      )}
      <TextInput
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={error ? "#ef4444" : "#52525b"}
        className="w-full py-3 text-lg text-zinc-400"
      />
      {error && (
        <CustomText variant="body2" className="absolute -bottom-8 text-red-500">
          {error.message || "Error"}
        </CustomText>
      )}
    </View>
  );
};

export default CustomInput;
