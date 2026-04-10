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
  return res.data as UserProfile;
}

export async function getLeaderboard() {
  const res = await api.get("/leaderboard");
  return res.data as UserProfile[];
}

export async function fetchUserProfile(userId: string) {
  const res = await api.get(`/users/${userId}`);
  return res.data as UserProfile;
}

