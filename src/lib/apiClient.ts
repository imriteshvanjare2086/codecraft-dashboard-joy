import axios from "axios";

const TOKEN_KEY = "codetrack_token";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY) || "";
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function ensureAnonymousAuth() {
  const token = getToken();
  if (token) return token;
  const res = await api.post("/auth/anonymous");
  setToken(res.data.token);
  return res.data.token as string;
}

