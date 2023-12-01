import { useContext, createContext, useEffect } from "react";
// import jwtDecode from "jwt-decode";
import { useStorageState } from "../hooks/useStorageState";

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

  // Check if the token is expired
  // useEffect(() => {
  //   if (token) {
  //     const { exp } = jwtDecode(token);
  //     if (Date.now() >= exp * 1000) {
  //       setToken(null);
  //     }
  //   }

  //   // Set the token in the API header
  //   // api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  // }, [token]);

  const login = async (data) => {
    setToken("exampleToken");

    // try {
    //   const response = await authApi.post("/login", data);
    //   const { token, userId } = response.data.data;
    //   await setSession(token);
    //   await setUserId(userId);
    //   api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //   return response.data.data;
    // } catch (error) {
    //   return { error: true, msg: error.response.data.msg };
    // }
  };

  const register = async (data) => {
    setToken("exampleToken");

    // try {
    //   return await authApi.post("/register", data);
    // } catch (error) {
    //   return { error: true, msg: error.response.data.msg };
    // }
  };

  const logout = async () => {
    setToken(null);
  };

  const value = {
    token,
    isLoading,
    onLogin: login,
    onRegister: register,
    onLogout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
