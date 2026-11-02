import { useCallback, useState } from "react";
import { UserContext } from "./UserContext.jsx";
import { apiRequest } from "../services/api.js";

export default function UserProvider({ children }) {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState("");

  const logout = useCallback(() => {
    setToken(null);
    setEmail("");
  }, []);

  const authenticate = async (path, credentials) => {
    const data = await apiRequest(path, {
      method: "POST",
      body: credentials,
    });

    if (!data.token || !data.email) {
      throw new Error(
        "El servidor no devolvió los datos de sesión."
      );
    }

    setToken(data.token);
    setEmail(data.email);

    return data;
  };

  const login = (credentials) => {
    return authenticate("/auth/login", credentials);
  };

  const register = (credentials) => {
    return authenticate("/auth/register", credentials);
  };

  const getProfile = useCallback(
    async (signal) => {
      if (!token) {
        throw new Error("Debes iniciar sesión.");
      }

      try {
        return await apiRequest("/auth/me", {
          token,
          signal,
        });
      } catch (error) {
        if (error.status === 401 && !signal?.aborted) {
          logout();
        }

        throw error;
      }
    },
    [token, logout]
  );

  return (
    <UserContext.Provider
      value={{
        token,
        email,
        login,
        register,
        logout,
        getProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}