import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const router = useRouter();
  const { onRegister } = useAuth();

  return (
    <View>
      <Text>Register</Text>
      <Text onPress={() => router.replace("/(auth)/login")}>Go to login</Text>
      <TouchableOpacity onPress={onRegister}>Register</TouchableOpacity>
    </View>
  );
};

export default Register;
