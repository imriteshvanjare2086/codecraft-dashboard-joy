import { api, setToken } from "@/lib/apiClient";

export async function login(payload: { email: string; password: string }) {
  const res = await api.post("/auth/login", payload);
  setToken(res.data.token);
  return res.data as { token: string };
}

export async function register(payload: { username: string; email: string; password: string }) {
  const res = await api.post("/auth/register", payload);
  setToken(res.data.token);
  return res.data as { token: string };
}

