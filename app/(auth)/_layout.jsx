import { Redirect, Stack } from "expo-router";
import { useAuth } from "../../context/AuthContext";

const AuthLayout = () => {
  const { token } = useAuth();

  if (token) {
    return <Redirect href="(app)" />;
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
