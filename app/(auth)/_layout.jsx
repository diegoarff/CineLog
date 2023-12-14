import { Redirect, Stack } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { ActivityIndicator, View } from "react-native";
import colors from "tailwindcss/colors";

const AuthLayout = () => {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-base">
        <ActivityIndicator size="large" color={colors.teal[500]} />
      </View>
    );
  }

  if (token) {
    return <Redirect href="/(app)/(tabs)/home" />;
  }

  const headerOptions = {
    // headerTitle: "",
    // headerShadowVisible: false,
    // headerStyle: {
    //   backgroundColor: "#030712" // gray-950 on tailwindcss palette,
    // },
    headerShown: false,
  };

  return (
    <Stack>
      <Stack.Screen name="login" options={headerOptions} />
      <Stack.Screen name="register" options={headerOptions} />
    </Stack>
  );
};

export default AuthLayout;
