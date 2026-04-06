// Mock data — replace with real API calls later

export const heroStats = {
  totalProblems: 847,
  streak: 23,
  level: "Expert",
  score: 2450,
};

export const leetcodeStats = {
  totalSolved: 423,
  easy: 180,
  medium: 195,
  hard: 48,
  ranking: 45231,
  acceptanceRate: 67.3,
};

export const codeforcesStats = {
  rating: 1756,
  maxRating: 1823,
  rank: "Expert",
  solved: 312,
  contests: 45,
};

export const codechefStats = {
  stars: 5,
  rating: 2012,
  solved: 112,
  contests: 22,
};

// Generate contribution data for last 365 days
export const generateContributionData = () => {
  const data: { date: string; count: number }[] = [];
  const now = new Date();
  for (let i = 364; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const rand = Math.random();
    let count = 0;
    if (rand > 0.3) count = Math.ceil(Math.random() * 2);
    if (rand > 0.6) count = Math.ceil(Math.random() * 4);
    if (rand > 0.85) count = Math.ceil(Math.random() * 8);
    data.push({ date: dateStr, count });
  }
  return data;
};

export const ratingHistory = {
  codeforces: [
    { contest: "Round 900", date: "2026-01-05", rating: 1650 },
    { contest: "Round 905", date: "2026-01-19", rating: 1702 },
    { contest: "Round 910", date: "2026-02-02", rating: 1680 },
    { contest: "Round 915", date: "2026-02-16", rating: 1756 },
    { contest: "Round 920", date: "2026-03-01", rating: 1790 },
    { contest: "Round 925", date: "2026-03-15", rating: 1823 },
    { contest: "Round 930", date: "2026-03-29", rating: 1756 },
  ],
  leetcode: [
    { contest: "Weekly 380", date: "2026-01-12", rating: 1890 },
    { contest: "Weekly 385", date: "2026-02-09", rating: 1920 },
    { contest: "Weekly 390", date: "2026-03-09", rating: 1955 },
    { contest: "Weekly 395", date: "2026-04-06", rating: 1980 },
  ],
};

export const weakTopics = [
  { name: "Dynamic Programming", accuracy: 32 },
  { name: "Graph Theory", accuracy: 41 },
  { name: "Segment Trees", accuracy: 28 },
  { name: "Number Theory", accuracy: 45 },
];

export const recommendations = [
  "Solve 3 DP problems on LeetCode (Medium)",
  "Practice 2 Graph BFS/DFS problems",
  "Attempt a Segment Tree problem on Codeforces",
  "Review Number Theory concepts",
];

export const leaderboard = [
  { rank: 1, name: "tourist", score: 3850, avatar: "T" },
  { rank: 2, name: "Benq", score: 3720, avatar: "B" },
  { rank: 3, name: "ecnerwala", score: 3680, avatar: "E" },
  { rank: 4, name: "jiangly", score: 3550, avatar: "J" },
  { rank: 5, name: "You", score: 2450, avatar: "Y" },
];

export const dailyGoal = {
  target: 5,
  completed: 3,
  label: "Problems Today",
};
