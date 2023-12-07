import { Text, View } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";

import {
  CustomButton,
  CustomInput,
  CustomText,
  Logo,
  AvoidKeyboard,
} from "../../components";

const Login = () => {
  const router = useRouter();
  const { onLogin } = useAuth();
  const { control, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const loginHandler = async (data) => {
    try {
      setLoading(true);
      const result = await onLogin(data);

      if (result.error) {
        setLoading(false);
        alert(result.msg);
        return;
      }

      setLoading(false);
      router.replace("/");
    } catch (error) {
      console.log("🚀 ~ file: login.jsx:29 ~ loginHandler ~ error:", error);
    }
  };

  return (
    <AvoidKeyboard>
      <View className=" bg-base flex-1 items-center justify-center px-4">
        <View className="mb-12 w-full items-center gap-4">
          <Logo className="h-24 aspect-square"/>
          <CustomText variant="h2" className="text-accent">
            Sign in
          </CustomText>
          <CustomText className="text-baseLight">
            Sign in to enter the app
          </CustomText>
        </View>

        <CustomInput
          name="identifier"
          icon="person-outline"
          rules={{
            required: "Username or email is required",
            minLength: { value: 2, message: "Minimum length is 2" },
          }}
          placeholder="Username or email"
          control={control}
        />
        <CustomInput
          name="password"
          icon="lock-closed-outline"
          rules={{
            required: "Password is required",
            minLength: { value: 8, message: "Minimum length is 8" },
            pattern: {
              value: /^(?=.*[A-Z])(?=.*\d).+$/,
              message: "At least 1 uppercase and 1 number is required",
            },
          }}
          placeholder="Password"
          secureTextEntry
          control={control}
        />

        <View className="w-full items-center gap-8">
          <CustomButton
            label="Sign in"
            loading={loading}
            disabled={loading}
            onPress={handleSubmit(async (data) => await loginHandler(data))}
          />
          <CustomText className="text-baseLight">
            Dont have an account?
            <Text
              className="text-accent"
              onPress={() => {
                router.replace("/(auth)/register");
              }}
            >
              {" "}
              Sign up
            </Text>
          </CustomText>
        </View>
      </View>
    </AvoidKeyboard>
  );
};

export default Login;
