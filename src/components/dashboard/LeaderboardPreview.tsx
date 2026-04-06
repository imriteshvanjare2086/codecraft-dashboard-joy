import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { leaderboard } from "@/lib/mockData";

export function LeaderboardPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="rounded-xl border border-border bg-card p-4 md:p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="h-4 w-4 text-leetcode" />
        <h3 className="text-sm font-heading font-semibold text-foreground">Leaderboard</h3>
      </div>
      <div className="space-y-2">
        {leaderboard.map((user) => (
          <div
            key={user.rank}
            className={`flex items-center gap-3 rounded-lg p-2.5 text-sm font-mono transition-colors ${
              user.name === "You" ? "bg-primary/10 border border-primary/20" : "hover:bg-muted/50"
            }`}
          >
            <span className={`w-6 text-center text-xs font-bold ${
              user.rank <= 3 ? "text-leetcode" : "text-muted-foreground"
            }`}>
              {user.rank}
            </span>
            <div className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-secondary-foreground">
              {user.avatar}
            </div>
            <span className={`flex-1 ${user.name === "You" ? "text-primary font-semibold" : "text-foreground"}`}>
              {user.name}
            </span>
            <span className="text-xs text-muted-foreground">{user.score.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
