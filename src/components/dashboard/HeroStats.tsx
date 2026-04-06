import { motion } from "framer-motion";
import { Flame, Trophy, Award, Code2, Zap } from "lucide-react";
import { heroStats, badges } from "@/lib/mockData";

const statCards = [
  {
    label: "Total Problems",
    value: heroStats.totalProblems,
    icon: Code2,
    color: "text-primary",
    gradient: "from-primary/20 to-primary/5",
    borderColor: "border-primary/20",
  },
  {
    label: "Current Streak",
    value: `${heroStats.streak} days`,
    icon: Flame,
    color: "text-leetcode",
    gradient: "from-leetcode/20 to-leetcode/5",
    borderColor: "border-leetcode/20",
  },
  {
    label: "Level",
    value: heroStats.level,
    icon: Trophy,
    color: "text-codeforces",
    gradient: "from-codeforces/20 to-codeforces/5",
    borderColor: "border-codeforces/20",
  },
  {
    label: "Longest Streak",
    value: `${heroStats.longestStreak} days`,
    icon: Zap,
    color: "text-longest-streak",
    gradient: "from-longest-streak/20 to-longest-streak/5",
    borderColor: "border-longest-streak/20",
  },
];

const earnedCount = badges.filter((b) => b.earned).length;

export function HeroStats() {
  return (
    <div className="space-y-3 md:space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={`group relative rounded-2xl border ${card.borderColor} bg-gradient-to-br ${card.gradient} p-4 md:p-5 backdrop-blur-sm cursor-default transition-shadow duration-300`}
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
                  {card.label}
                </span>
                <div className={`p-1.5 rounded-lg bg-background/40 ${card.color} transition-transform duration-300 group-hover:scale-110`}>
                  <card.icon className="h-3.5 w-3.5" />
                </div>
              </div>
              <p className={`text-2xl md:text-3xl font-bold font-heading ${card.color}`}>
                {card.value}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Badges Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-leetcode/10">
              <Award className="h-4 w-4 text-leetcode" />
            </div>
            <div>
              <h3 className="text-sm font-heading font-semibold text-foreground">Badges</h3>
              <p className="text-[10px] text-muted-foreground font-mono mt-0.5">
                {earnedCount} of {badges.length} earned
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35 + i * 0.05 }}
              whileHover={{ scale: 1.08, transition: { duration: 0.15 } }}
              className={`group relative flex flex-col items-center gap-1.5 rounded-xl p-3 text-center cursor-default transition-all duration-200 ${
                badge.earned
                  ? "bg-primary/5 border border-primary/20"
                  : "bg-muted/30 border border-border/30 opacity-50 grayscale"
              }`}
              title={badge.description}
            >
              <span className="text-2xl">{badge.icon}</span>
              <span className={`text-[9px] font-mono leading-tight ${
                badge.earned ? "text-foreground" : "text-muted-foreground"
              }`}>
                {badge.name}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
