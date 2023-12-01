import { Redirect, Stack } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { ActivityIndicator, SafeAreaView } from "react-native";

const AppLayout = () => {
  const { isLoading, token } = useAuth();

  if (isLoading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" color="#000000" />
      </SafeAreaView>
    );
  }

  if (!token) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AppLayout;
