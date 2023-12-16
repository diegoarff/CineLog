import { Redirect, Stack } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { ActivityIndicator, View } from "react-native";
import colors from "tailwindcss/colors";

const AppLayout = () => {
  const { isLoading, token } = useAuth();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-base">
        <ActivityIndicator size="large" color={colors.teal[500]} />
      </View>
    );
  }

  if (!token) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="search" options={{ headerShown: false }} />
      <Stack.Screen
        name="profile"
        options={{
          headerStyle: { backgroundColor: "#101015" },
          headerTintColor: colors.zinc[200],
          headerShadowVisible: false,
          headerTitle: "Profile",
        }}
      />
      <Stack.Screen
        name="movie/[id]/reviews"
        options={{
          headerStyle: { backgroundColor: "#101015" },
          headerTintColor: colors.zinc[200],
          headerShadowVisible: false,
          headerTitle: "Reviews",
        }}
      />
      <Stack.Screen
        name="tv/[id]/reviews"
        options={{
          headerStyle: { backgroundColor: "#101015" },
          headerTintColor: colors.zinc[200],
          headerShadowVisible: false,
          headerTitle: "Reviews",
        }}
      />
      <Stack.Screen
        name="reviews/[id]"
        options={{
          headerStyle: { backgroundColor: "#101015" },
          headerTintColor: colors.zinc[200],
          headerShadowVisible: false,
          headerTitle: "Review",
        }}
      />
      <Stack.Screen
        name="comments/[id]"
        options={{
          headerStyle: { backgroundColor: "#101015" },
          headerTintColor: colors.zinc[200],
          headerShadowVisible: false,
          headerTitle: "Comment",
        }}
      />
      <Stack.Screen
        name="chat/[id]"
        options={{
          headerStyle: { backgroundColor: "#101015" },
          headerTintColor: colors.zinc[200],
          headerShadowVisible: false,
          headerTitle: "Chat",
        }}
      />
      <Stack.Screen
        name="user/[id]"
        options={{
          headerStyle: { backgroundColor: "#101015" },
          headerTintColor: colors.zinc[200],
          headerShadowVisible: false,
          headerTitle: "User",
        }}
      />
      <Stack.Screen
        name="private_chat/[id]"
        options={{
          headerStyle: { backgroundColor: "#101015" },
          headerTintColor: colors.zinc[200],
          headerShadowVisible: false,
          headerTitle: "Private",
        }}
      />
    </Stack>
  );
};

export default AppLayout;
