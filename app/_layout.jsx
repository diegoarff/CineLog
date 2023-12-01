import { Slot } from "expo-router";
import { AuthProvider } from "../context/AuthContext";

const Root = () => {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
};

export default Root;
