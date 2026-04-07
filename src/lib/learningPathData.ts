export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface Topic {
  id: string;
  name: string;
  icon: string;
  totalProblems: number;
  solved: number;
  difficulty: Difficulty;
  subtopics: { name: string; solved: number; total: number }[];
}

export interface LearningSheet {
  id: string;
  name: string;
  description: string;
  totalProblems: number;
  solved: number;
  topics: string[];
}

export const learningTopics: Topic[] = [
  {
    id: "arrays",
    name: "Arrays & Hashing",
    icon: "📦",
    totalProblems: 45,
    solved: 38,
    difficulty: "beginner",
    subtopics: [
      { name: "Two Sum Pattern", solved: 8, total: 8 },
      { name: "Sliding Window", solved: 10, total: 12 },
      { name: "Prefix Sum", solved: 7, total: 8 },
      { name: "Sorting Tricks", solved: 6, total: 7 },
      { name: "Hashing", solved: 7, total: 10 },
    ],
  },
  {
    id: "binary-search",
    name: "Binary Search",
    icon: "🔍",
    totalProblems: 30,
    solved: 24,
    difficulty: "beginner",
    subtopics: [
      { name: "Basic BS", solved: 10, total: 10 },
      { name: "BS on Answer", solved: 6, total: 8 },
      { name: "Search in Rotated", solved: 4, total: 5 },
      { name: "Median / Kth", solved: 4, total: 7 },
    ],
  },
  {
    id: "linked-list",
    name: "Linked Lists",
    icon: "🔗",
    totalProblems: 25,
    solved: 20,
    difficulty: "beginner",
    subtopics: [
      { name: "Reversal", solved: 6, total: 6 },
      { name: "Fast & Slow Pointer", solved: 5, total: 5 },
      { name: "Merge / Sort", solved: 5, total: 7 },
      { name: "Doubly Linked", solved: 4, total: 7 },
    ],
  },
  {
    id: "stacks-queues",
    name: "Stacks & Queues",
    icon: "📚",
    totalProblems: 28,
    solved: 18,
    difficulty: "intermediate",
    subtopics: [
      { name: "Monotonic Stack", solved: 5, total: 8 },
      { name: "Next Greater Element", solved: 4, total: 5 },
      { name: "Queue using Stack", solved: 3, total: 3 },
      { name: "LRU / LFU Cache", solved: 6, total: 12 },
    ],
  },
  {
    id: "trees",
    name: "Trees",
    icon: "🌲",
    totalProblems: 40,
    solved: 25,
    difficulty: "intermediate",
    subtopics: [
      { name: "Traversals", solved: 8, total: 8 },
      { name: "BST Operations", solved: 6, total: 8 },
      { name: "Path Problems", solved: 5, total: 10 },
      { name: "Segment Trees", solved: 6, total: 14 },
    ],
  },
  {
    id: "graphs",
    name: "Graphs",
    icon: "🕸️",
    totalProblems: 50,
    solved: 22,
    difficulty: "intermediate",
    subtopics: [
      { name: "BFS / DFS", solved: 8, total: 10 },
      { name: "Shortest Path", solved: 5, total: 10 },
      { name: "Topological Sort", solved: 4, total: 8 },
      { name: "Union Find", solved: 3, total: 8 },
      { name: "MST", solved: 2, total: 7 },
      { name: "Network Flow", solved: 0, total: 7 },
    ],
  },
  {
    id: "dp",
    name: "Dynamic Programming",
    icon: "🧠",
    totalProblems: 60,
    solved: 18,
    difficulty: "advanced",
    subtopics: [
      { name: "1D DP", solved: 8, total: 10 },
      { name: "2D DP", solved: 5, total: 12 },
      { name: "Knapsack", solved: 3, total: 10 },
      { name: "LCS / LIS", solved: 2, total: 8 },
      { name: "DP on Trees", solved: 0, total: 10 },
      { name: "Bitmask DP", solved: 0, total: 10 },
    ],
  },
  {
    id: "strings",
    name: "Strings",
    icon: "✏️",
    totalProblems: 30,
    solved: 15,
    difficulty: "intermediate",
    subtopics: [
      { name: "Pattern Matching", solved: 5, total: 8 },
      { name: "KMP / Z-algo", solved: 4, total: 7 },
      { name: "Trie", solved: 3, total: 8 },
      { name: "Rolling Hash", solved: 3, total: 7 },
    ],
  },
  {
    id: "number-theory",
    name: "Number Theory",
    icon: "🔢",
    totalProblems: 25,
    solved: 10,
    difficulty: "advanced",
    subtopics: [
      { name: "GCD / LCM", solved: 4, total: 5 },
      { name: "Modular Arithmetic", solved: 3, total: 7 },
      { name: "Sieve", solved: 2, total: 6 },
      { name: "Combinatorics", solved: 1, total: 7 },
    ],
  },
  {
    id: "greedy",
    name: "Greedy Algorithms",
    icon: "🎯",
    totalProblems: 25,
    solved: 16,
    difficulty: "intermediate",
    subtopics: [
      { name: "Interval Scheduling", solved: 5, total: 6 },
      { name: "Activity Selection", solved: 4, total: 5 },
      { name: "Huffman / Optimal", solved: 3, total: 6 },
      { name: "Exchange Arguments", solved: 4, total: 8 },
    ],
  },
];

export const learningSheets: LearningSheet[] = [
  {
    id: "a2z",
    name: "Striver's A2Z DSA Sheet",
    description: "Complete DSA preparation from basics to advanced",
    totalProblems: 455,
    solved: 312,
    topics: ["Arrays", "Binary Search", "Linked List", "Stacks", "Trees", "Graphs", "DP"],
  },
  {
    id: "blind75",
    name: "Blind 75",
    description: "Most frequently asked interview problems",
    totalProblems: 75,
    solved: 58,
    topics: ["Arrays", "Two Pointers", "Sliding Window", "Trees", "DP"],
  },
  {
    id: "neetcode150",
    name: "NeetCode 150",
    description: "Curated list for FAANG preparation",
    totalProblems: 150,
    solved: 102,
    topics: ["Arrays", "Binary Search", "Graphs", "DP", "Heap"],
  },
  {
    id: "codeforces-ladders",
    name: "Codeforces Ladders",
    description: "Rating-wise problem sets for CP improvement",
    totalProblems: 200,
    solved: 85,
    topics: ["Greedy", "Graphs", "DP", "Number Theory", "Strings"],
  },
];
