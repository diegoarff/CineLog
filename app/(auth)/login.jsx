import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const router = useRouter();
  const { onLogin } = useAuth();

  return (
    <View>
      <Text>Login</Text>
      <Text onPress={() => router.replace("/(auth)/register")}>
        Go to register
      </Text>
      <TouchableOpacity onPress={onLogin}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
