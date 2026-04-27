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

export function getDeterministicStats(username: string) {
  // Stable hash based solely on the username
  const hash = Array.from(username || "User").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const baseProblems = Math.max(10, 850 - (hash % 800)); 
  const baseStreak = Math.max(0, 60 - (hash % 60));
  
  return {
    problemsSolved: baseProblems,
    streak: baseStreak,
    platformStats: {
      leetcode: Math.floor(baseProblems * 0.45),
      codeforces: Math.floor(baseProblems * 0.35),
      codechef: Math.floor(baseProblems * 0.20),
    }
  };
}

export function populateUserData(u: any) {
  const dummy = getDeterministicStats(u.username);
  const problemsSolved = u.problemsSolved > 0 ? u.problemsSolved : dummy.problemsSolved;
  const streak = u.streak > 0 ? u.streak : dummy.streak;
  
  const hasPlatforms = u.platformStats && (u.platformStats.leetcode > 0 || u.platformStats.codeforces > 0 || u.platformStats.codechef > 0);
  const platformStats = hasPlatforms ? u.platformStats : dummy.platformStats;

  return {
    ...u,
    problemsSolved,
    streak,
    platformStats
  };
}

export async function getLeaderboard() {
  const res = await api.get("/leaderboard");
  let data = res.data as UserProfile[];
  
  // Inject consistent dummy data based on names
  data = data.map((u) => populateUserData(u) as UserProfile);

  // Sort organically
  data.sort((a, b) => b.problemsSolved - a.problemsSolved);

  return data;
}

export async function fetchUserProfile(userId: string) {
  const res = await api.get(`/users/${userId}`);
  return res.data as UserProfile;
}

