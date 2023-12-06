import { useContext, createContext } from "react";
// import jwtDecode from "jwt-decode";
import { useStorageState } from "../hooks/useStorageState";
import { api, setHeaderToken, removeHeaderToken } from "../api/config";

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
    try {
      const response = await api.post("/auth/signin", data);
      const { token } = response.data.data;
      setHeaderToken(token);
      await setToken(token);

      return response.data.data;
    } catch (error) {
      return { error: true, msg: error.response.data.msg };
    }
  };
  const register = async (data) => {
    try {
      return await api.post("/auth/signup", data);
    } catch (error) {
      return { error: true, msg: error.response.data.msg };
    }
  };

  const logout = async () => {
    removeHeaderToken();
    await setToken(null);
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
