import "core-js/stable/atob"; // Polyfill for atob to make jwt-decode work
import { useContext, createContext, useEffect } from "react";
import { useStorageState } from "../hooks/useStorageState";
import { api, setHeaderToken, removeHeaderToken } from "../api/config";
import { jwtDecode } from "jwt-decode";
import { ToastAndroid } from "react-native";

const AuthContext = createContext(null);

// This hook can be used to access the user info.
export function useAuth() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function AuthProvider({ children }) {
  const [[isLoading, token], setToken] = useStorageState("token");
  const [[isUserLoading, userId], setUserId] = useStorageState("userId");

  // Check if the token is expired
  useEffect(() => {
    if (token) {
      const { exp } = jwtDecode(token);
      if (Date.now() >= exp * 1000) {
        setToken(null);
      }

      // Set the token in the API header
      setHeaderToken(token);
    }
  }, [token]);

  const login = async (data) => {
    try {
      const response = await api.post("/auth/signin", data);
      const { token, userId } = response.data.data;
      setHeaderToken(token);
      await setToken(token);
      await setUserId(userId);

      ToastAndroid.show("Login successful", ToastAndroid.SHORT);

      return response.data.data;
    } catch (error) {
      ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
      return { error: true, message: error.response.data.message };
    }
  };
  const register = async (data) => {
    try {
      const response = await api.post("/auth/signup", data);
      ToastAndroid.show("Registration successful", ToastAndroid.SHORT);

      return response.data.data;
    } catch (error) {
      ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
      return { error: true, message: error.response.data.message };
    }
  };

  const logout = async () => {
    removeHeaderToken();
    await setToken(null);
    await setUserId(null);
  };

  const value = {
    token,
    isLoading,
    userId,
    isUserLoading,
    onLogin: login,
    onRegister: register,
    onLogout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
