export type Platform = "leetcode" | "codeforces" | "codechef";
export type ProblemDifficulty = "easy" | "medium" | "hard";
export type ProblemStatus = "solved" | "attempted" | "unsolved";

export interface Problem {
  id: string;
  title: string;
  platform: Platform;
  difficulty: ProblemDifficulty;
  topic: string;
  sheet: string;
  status: ProblemStatus;
  accuracy: number;
  url: string;
}

export const problemTopics = [
  "Arrays", "Binary Search", "Linked List", "Stacks", "Queues",
  "Trees", "Graphs", "DP", "Greedy", "Strings", "Number Theory",
  "Backtracking", "Bit Manipulation", "Heap", "Trie",
];

export const problemSheets = ["A2Z", "Blind 75", "NeetCode 150", "CF Ladders", "All"];

export const mockProblems: Problem[] = [
  { id: "1", title: "Two Sum", platform: "leetcode", difficulty: "easy", topic: "Arrays", sheet: "Blind 75", status: "solved", accuracy: 100, url: "#" },
  { id: "2", title: "Best Time to Buy and Sell Stock", platform: "leetcode", difficulty: "easy", topic: "Arrays", sheet: "Blind 75", status: "solved", accuracy: 95, url: "#" },
  { id: "3", title: "Contains Duplicate", platform: "leetcode", difficulty: "easy", topic: "Arrays", sheet: "Blind 75", status: "solved", accuracy: 100, url: "#" },
  { id: "4", title: "Product of Array Except Self", platform: "leetcode", difficulty: "medium", topic: "Arrays", sheet: "Blind 75", status: "solved", accuracy: 85, url: "#" },
  { id: "5", title: "Maximum Subarray", platform: "leetcode", difficulty: "medium", topic: "DP", sheet: "Blind 75", status: "solved", accuracy: 90, url: "#" },
  { id: "6", title: "3Sum", platform: "leetcode", difficulty: "medium", topic: "Arrays", sheet: "NeetCode 150", status: "attempted", accuracy: 60, url: "#" },
  { id: "7", title: "Merge Intervals", platform: "leetcode", difficulty: "medium", topic: "Arrays", sheet: "A2Z", status: "solved", accuracy: 88, url: "#" },
  { id: "8", title: "Longest Substring Without Repeating", platform: "leetcode", difficulty: "medium", topic: "Strings", sheet: "Blind 75", status: "solved", accuracy: 82, url: "#" },
  { id: "9", title: "Search in Rotated Sorted Array", platform: "leetcode", difficulty: "medium", topic: "Binary Search", sheet: "Blind 75", status: "attempted", accuracy: 45, url: "#" },
  { id: "10", title: "Word Break", platform: "leetcode", difficulty: "medium", topic: "DP", sheet: "Blind 75", status: "unsolved", accuracy: 0, url: "#" },
  { id: "11", title: "Trapping Rain Water", platform: "leetcode", difficulty: "hard", topic: "Stacks", sheet: "NeetCode 150", status: "solved", accuracy: 70, url: "#" },
  { id: "12", title: "Merge K Sorted Lists", platform: "leetcode", difficulty: "hard", topic: "Heap", sheet: "Blind 75", status: "attempted", accuracy: 35, url: "#" },
  { id: "13", title: "Edit Distance", platform: "leetcode", difficulty: "hard", topic: "DP", sheet: "A2Z", status: "unsolved", accuracy: 0, url: "#" },
  { id: "14", title: "Watermelon", platform: "codeforces", difficulty: "easy", topic: "Greedy", sheet: "CF Ladders", status: "solved", accuracy: 100, url: "#" },
  { id: "15", title: "Theatre Square", platform: "codeforces", difficulty: "easy", topic: "Greedy", sheet: "CF Ladders", status: "solved", accuracy: 100, url: "#" },
  { id: "16", title: "George and Accommodation", platform: "codeforces", difficulty: "easy", topic: "Greedy", sheet: "CF Ladders", status: "solved", accuracy: 95, url: "#" },
  { id: "17", title: "Boredom", platform: "codeforces", difficulty: "medium", topic: "DP", sheet: "CF Ladders", status: "solved", accuracy: 78, url: "#" },
  { id: "18", title: "Cut Ribbon", platform: "codeforces", difficulty: "medium", topic: "DP", sheet: "CF Ladders", status: "attempted", accuracy: 50, url: "#" },
  { id: "19", title: "Dijkstra?", platform: "codeforces", difficulty: "hard", topic: "Graphs", sheet: "CF Ladders", status: "unsolved", accuracy: 0, url: "#" },
  { id: "20", title: "Turbo Sort", platform: "codechef", difficulty: "easy", topic: "Arrays", sheet: "All", status: "solved", accuracy: 100, url: "#" },
  { id: "21", title: "Chef and Strings", platform: "codechef", difficulty: "medium", topic: "Strings", sheet: "All", status: "solved", accuracy: 80, url: "#" },
  { id: "22", title: "Subtree Removal", platform: "codechef", difficulty: "hard", topic: "Trees", sheet: "All", status: "unsolved", accuracy: 0, url: "#" },
  { id: "23", title: "Number of Islands", platform: "leetcode", difficulty: "medium", topic: "Graphs", sheet: "Blind 75", status: "solved", accuracy: 92, url: "#" },
  { id: "24", title: "Course Schedule", platform: "leetcode", difficulty: "medium", topic: "Graphs", sheet: "Blind 75", status: "solved", accuracy: 85, url: "#" },
  { id: "25", title: "Coin Change", platform: "leetcode", difficulty: "medium", topic: "DP", sheet: "Blind 75", status: "attempted", accuracy: 55, url: "#" },
];
