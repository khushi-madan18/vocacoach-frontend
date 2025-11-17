import axios from "axios";

export const API_BASE =
  import.meta.env.VITE_API_BASE || "http://localhost:4000/api";

// Helper: strip the trailing "/api" so we get backend ROOT URL
export function getBackendRoot() {
  return API_BASE.replace(/\/api\/?$/, "");
}

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

export function setAuthToken(token) {
  if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete api.defaults.headers.common["Authorization"];
}

export default api;
