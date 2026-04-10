import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/apiClient";

export function useDashboard(userId?: string) {
  return useQuery({
    queryKey: ["dashboard", userId],
    queryFn: async () => {
      const endpoint = userId ? `/users/${userId}` : "/user/profile";
      const res = await api.get(endpoint);
      const user = res.data;
      
      return {
        profile: user,
        heroStats: {
          totalProblems: user.problemsSolved || 0,
          totalSubmissions: user.problemsSolved || 0, // Mapping solved to submissions for now
          currentStreak: user.streak || 0,
          activeDays: user.streak || 0, // Mapping streak to active days for now
          longestStreak: user.streak || 0, 
          level: user.rank || "Beginner",
        },
        leetcodeStats: {
          totalSolved: user.platformStats?.leetcode || 0,
          rating: 0,
          contests: 0,
          ranking: 0,
          acceptanceRate: 0
        },
        codeforcesStats: {
          solved: user.platformStats?.codeforces || 0,
          rating: 0,
          contests: 0,
          rank: "Unrated"
        },
        codechefStats: {
          solved: user.platformStats?.codechef || 0,
          rating: 0,
          contests: 0,
          stars: 0
        },
        badges: [
          { name: "Starter", earned: true, description: "Joined the platform", icon: "🌱" }
        ],
        ratingHistory: {
          codeforces: [],
          leetcode: []
        },
        stats: user
      };
    },
  });
}

