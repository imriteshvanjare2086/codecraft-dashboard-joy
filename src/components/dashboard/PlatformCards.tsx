import { motion } from "framer-motion";
import { leetcodeStats, codeforcesStats, codechefStats } from "@/lib/mockData";
import { Star } from "lucide-react";

function DifficultyBar({ label, value, total, color }: { label: string; value: number; total: number; color: string }) {
  const pct = (value / total) * 100;
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-14 text-muted-foreground font-mono">{label}</span>
      <div className="flex-1 h-1.5 rounded-full bg-muted">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="w-8 text-right font-mono text-muted-foreground">{value}</span>
    </div>
  );
}

export function PlatformCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
      {/* LeetCode */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-xl border border-leetcode/20 bg-leetcode/5 p-4 md:p-5"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="h-3 w-3 rounded-full bg-leetcode" />
          <h3 className="text-sm font-heading font-semibold text-foreground">LeetCode</h3>
          <span className="ml-auto text-xs font-mono text-muted-foreground">#{leetcodeStats.ranking.toLocaleString()}</span>
        </div>
        <p className="text-3xl font-bold font-heading text-leetcode mb-4">
          {leetcodeStats.totalSolved}
        </p>
        <div className="space-y-2">
          <DifficultyBar label="Easy" value={leetcodeStats.easy} total={leetcodeStats.totalSolved} color="bg-primary" />
          <DifficultyBar label="Medium" value={leetcodeStats.medium} total={leetcodeStats.totalSolved} color="bg-leetcode" />
          <DifficultyBar label="Hard" value={leetcodeStats.hard} total={leetcodeStats.totalSolved} color="bg-destructive" />
        </div>
      </motion.div>

      {/* Codeforces */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-xl border border-codeforces/20 bg-codeforces/5 p-4 md:p-5"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="h-3 w-3 rounded-full bg-codeforces" />
          <h3 className="text-sm font-heading font-semibold text-foreground">Codeforces</h3>
          <span className="ml-auto text-xs font-mono text-codeforces">{codeforcesStats.rank}</span>
        </div>
        <p className="text-3xl font-bold font-heading text-codeforces mb-1">
          {codeforcesStats.rating}
        </p>
        <p className="text-xs text-muted-foreground font-mono mb-4">
          max: {codeforcesStats.maxRating}
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-muted/50 p-2 text-center">
            <p className="text-lg font-bold font-heading text-foreground">{codeforcesStats.solved}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Solved</p>
          </div>
          <div className="rounded-lg bg-muted/50 p-2 text-center">
            <p className="text-lg font-bold font-heading text-foreground">{codeforcesStats.contests}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Contests</p>
          </div>
        </div>
      </motion.div>

      {/* CodeChef */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="rounded-xl border border-codechef/20 bg-codechef/5 p-4 md:p-5"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="h-3 w-3 rounded-full bg-codechef" />
          <h3 className="text-sm font-heading font-semibold text-foreground">CodeChef</h3>
        </div>
        <div className="flex items-center gap-1 mb-1">
          {Array.from({ length: 7 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < codechefStats.stars ? "text-codechef fill-codechef" : "text-muted-foreground/30"}`}
            />
          ))}
        </div>
        <p className="text-3xl font-bold font-heading text-codechef mb-1">
          {codechefStats.rating}
        </p>
        <p className="text-xs text-muted-foreground font-mono mb-4">
          {codechefStats.stars}★ Coder
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-muted/50 p-2 text-center">
            <p className="text-lg font-bold font-heading text-foreground">{codechefStats.solved}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Solved</p>
          </div>
          <div className="rounded-lg bg-muted/50 p-2 text-center">
            <p className="text-lg font-bold font-heading text-foreground">{codechefStats.contests}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Contests</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
