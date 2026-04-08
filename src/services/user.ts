import { api } from "@/lib/apiClient";

export type UserProfile = {
  _id: string;
  username: string;
  email: string;
  streak: number;
  problemsSolved: number;
  platformStats: { leetcode: number; codeforces: number; codechef: number };
};

export async function fetchProfile() {
  const res = await api.get("/user/profile");
  return res.data.user as UserProfile;
}

