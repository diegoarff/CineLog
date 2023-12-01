import { Redirect, Stack } from "expo-router";
import { useAuth } from "../../context/AuthContext";

const AuthLayout = () => {
  const { token } = useAuth();

  if (token) {
    return <Redirect href="/" />;
  }

  return <Stack />;
};

export default AuthLayout;
