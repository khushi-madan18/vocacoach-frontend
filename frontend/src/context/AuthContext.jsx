import React, { createContext, useContext, useEffect, useState } from "react";
import api, { setAuthToken } from "../utils/api";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(Boolean(token));

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      localStorage.setItem("token", token);
      api.get("/auth/me")
        .then(r => setUser(r.data))
        .catch(() => { setToken(null); setUser(null); })
        .finally(() => setLoading(false));
    } else {
      setAuthToken(null);
      localStorage.removeItem("token");
      setUser(null);
      setLoading(false);
    }
  }, [token]);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    setToken(res.data.token);
    return res;
  };

  const signup = async (name, email, password) => {
    const res = await api.post("/auth/signup", { name, email, password });
    if (res.data.token) setToken(res.data.token);
    else await login(email, password);
    return res;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
