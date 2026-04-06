import { motion } from "framer-motion";
import { Flame, Trophy, Zap, Code2 } from "lucide-react";
import { heroStats } from "@/lib/mockData";

const cards = [
  {
    label: "Total Problems",
    value: heroStats.totalProblems,
    icon: Code2,
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
  },
  {
    label: "Current Streak",
    value: `${heroStats.streak} days`,
    icon: Flame,
    color: "text-leetcode",
    bg: "bg-leetcode/10",
    border: "border-leetcode/20",
  },
  {
    label: "Level",
    value: heroStats.level,
    icon: Trophy,
    color: "text-codeforces",
    bg: "bg-codeforces/10",
    border: "border-codeforces/20",
  },
  {
    label: "Score",
    value: heroStats.score.toLocaleString(),
    icon: Zap,
    color: "text-codechef",
    bg: "bg-codechef/10",
    border: "border-codechef/20",
  },
];

export function HeroStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          className={`rounded-xl border ${card.border} ${card.bg} p-4 md:p-5`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
              {card.label}
            </span>
            <card.icon className={`h-4 w-4 ${card.color}`} />
          </div>
          <p className={`text-2xl md:text-3xl font-bold font-heading ${card.color}`}>
            {card.value}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
