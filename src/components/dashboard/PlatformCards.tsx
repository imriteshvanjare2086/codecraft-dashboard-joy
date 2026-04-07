import { motion } from "framer-motion";
import { useDashboard } from "@/hooks/useDashboard";
import { Star, TrendingUp, Award, Hash } from "lucide-react";

function DifficultyBar({ label, value, total, color, delay }: { label: string; value: number; total: number; color: string; delay: number }) {
  const pct = (value / total) * 100;
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-14 text-muted-foreground font-mono">{label}</span>
      <div className="flex-1 h-2 rounded-full bg-muted/80 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ delay, duration: 0.8, ease: "easeOut" }}
        />
      </div>
      <span className="w-8 text-right font-mono text-muted-foreground">{value}</span>
    </div>
  );
}

function StatPill({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl bg-background/50 border border-border/50 p-3 text-center">
      <p className="text-lg font-bold font-heading text-foreground">{value}</p>
      <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">{label}</p>
    </div>
  );
}

export function PlatformCards() {
  const { data } = useDashboard();
  const leetcodeStats = data?.leetcodeStats || { totalSolved: 0, easy: 0, medium: 0, hard: 0, ranking: 0, acceptanceRate: 0 };
  const codeforcesStats = data?.codeforcesStats || { rating: 0, maxRating: 0, rank: "Unrated", solved: 0, contests: 0 };
  const codechefStats = data?.codechefStats || { stars: 0, rating: 0, solved: 0, contests: 0 };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
      {/* LeetCode */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className="group relative rounded-2xl border border-leetcode/15 bg-gradient-to-br from-leetcode/10 via-leetcode/5 to-transparent p-5 backdrop-blur-sm card-hover"
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
        <div className="relative">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="h-8 w-8 rounded-lg bg-leetcode/20 flex items-center justify-center">
              <Hash className="h-4 w-4 text-leetcode" />
            </div>
            <div>
              <h3 className="text-sm font-heading font-semibold text-foreground">LeetCode</h3>
              <span className="text-[10px] font-mono text-muted-foreground">
                {leetcodeStats.ranking ? `Rank #${leetcodeStats.ranking.toLocaleString()}` : "Not connected"}
              </span>
            </div>
            <span className="ml-auto text-[10px] font-mono text-leetcode/70 bg-leetcode/10 px-2 py-0.5 rounded-full">
              {leetcodeStats.acceptanceRate}% acc
            </span>
          </div>
          <p className="text-4xl font-bold font-heading text-leetcode mb-5">
            {leetcodeStats.totalSolved}
            <span className="text-sm text-muted-foreground font-normal ml-1">solved</span>
          </p>
          <div className="space-y-2.5">
            <DifficultyBar label="Easy" value={leetcodeStats.easy} total={leetcodeStats.totalSolved} color="bg-primary" delay={0.6} />
            <DifficultyBar label="Medium" value={leetcodeStats.medium} total={leetcodeStats.totalSolved} color="bg-leetcode" delay={0.7} />
            <DifficultyBar label="Hard" value={leetcodeStats.hard} total={leetcodeStats.totalSolved} color="bg-destructive" delay={0.8} />
          </div>
        </div>
      </motion.div>

      {/* Codeforces */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className="group relative rounded-2xl border border-codeforces/15 bg-gradient-to-br from-codeforces/10 via-codeforces/5 to-transparent p-5 backdrop-blur-sm card-hover"
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
        <div className="relative">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="h-8 w-8 rounded-lg bg-codeforces/20 flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-codeforces" />
            </div>
            <div>
              <h3 className="text-sm font-heading font-semibold text-foreground">Codeforces</h3>
              <span className="text-[10px] font-mono text-muted-foreground">{codeforcesStats.rank}</span>
            </div>
            <span className="ml-auto text-[10px] font-mono text-codeforces/70 bg-codeforces/10 px-2 py-0.5 rounded-full">
              max {codeforcesStats.maxRating}
            </span>
          </div>
          <p className="text-4xl font-bold font-heading text-codeforces mb-1">
            {codeforcesStats.rating}
          </p>
          <p className="text-xs text-muted-foreground font-mono mb-5">
            Current Rating
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            <StatPill label="Solved" value={codeforcesStats.solved} />
            <StatPill label="Contests" value={codeforcesStats.contests} />
          </div>
        </div>
      </motion.div>

      {/* CodeChef */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className="group relative rounded-2xl border border-codechef/15 bg-gradient-to-br from-codechef/10 via-codechef/5 to-transparent p-5 backdrop-blur-sm card-hover"
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
        <div className="relative">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="h-8 w-8 rounded-lg bg-codechef/20 flex items-center justify-center">
              <Award className="h-4 w-4 text-codechef" />
            </div>
            <div>
              <h3 className="text-sm font-heading font-semibold text-foreground">CodeChef</h3>
              <span className="text-[10px] font-mono text-muted-foreground">{codechefStats.stars}★ Coder</span>
            </div>
          </div>
          <div className="flex items-center gap-0.5 mb-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 transition-colors ${i < codechefStats.stars ? "text-codechef fill-codechef" : "text-muted/60"}`}
              />
            ))}
          </div>
          <p className="text-4xl font-bold font-heading text-codechef mb-1">
            {codechefStats.rating}
          </p>
          <p className="text-xs text-muted-foreground font-mono mb-5">
            Current Rating
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            <StatPill label="Solved" value={codechefStats.solved} />
            <StatPill label="Contests" value={codechefStats.contests} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
