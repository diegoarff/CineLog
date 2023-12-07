import { View, Text } from "react-native";
import React from "react";
import { useAuth } from "../../context/AuthContext";

const profile = () => {
  const { onLogout } = useAuth();

  return (
    <View>
      <Text>profile</Text>
      <Text onPress={onLogout}>Logout</Text>
    </View>
  );
};

export default profile;
