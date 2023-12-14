import { View, Text } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import {
  CustomButton,
  CustomInput,
  CustomText,
  Logo,
  AvoidKeyboard,
} from "../../components";
import { useForm } from "react-hook-form";

const Register = () => {
  const router = useRouter();
  const { onRegister } = useAuth();

  const { control, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const registerHandler = async (data) => {
    try {
      setLoading(true);
      const result = await onRegister(data);

      if (result.error) {
        setLoading(false);
        return;
      }

      setLoading(false);
      router.replace("/(auth)/login");
    } catch (error) {
      console.log(
        "🚀 ~ file: register.jsx:29 ~ registerHandler ~ error:",
        error,
      );
    }
  };

  return (
    <AvoidKeyboard>
      <View className="flex-1 items-center justify-center bg-base px-4">
        <View className="mb-12 w-full items-center gap-4">
          <Logo className="aspect-square h-24" />
          <CustomText variant="h2" className="text-accent">
            Sign up
          </CustomText>
          <CustomText className="text-baseLight">
            Create an account and start using the app
          </CustomText>
        </View>

        <CustomInput
          name="username"
          icon="person-outline"
          rules={{
            required: "Username is required",
            minLength: { value: 2, message: "Minimum length is 2" },
          }}
          placeholder="Username"
          control={control}
        />
        <CustomInput
          name="email"
          icon="mail-outline"
          rules={{
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email address",
            },
          }}
          placeholder="Email"
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
            label="Sign up"
            loading={loading}
            disabled={loading}
            onPress={handleSubmit(async (data) => await registerHandler(data))}
          />
          <CustomText className="text-baseLight">
            Already have an account?
            <Text
              className="text-accent"
              onPress={() => {
                router.replace("/(auth)/login");
              }}
            >
              {" "}
              Sign in
            </Text>
          </CustomText>
        </View>
      </View>
    </AvoidKeyboard>
  );
};

export default Register;
