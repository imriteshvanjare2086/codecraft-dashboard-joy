import { motion } from "framer-motion";
import { Flame, Trophy, Award, Code2, Zap } from "lucide-react";
import { useState } from "react";

const statCards = [
  {
    label: "Total Problems",
    value: 0,
    icon: Code2,
    color: "text-primary",
    gradient: "from-primary/20 to-primary/5",
    borderColor: "border-primary/20",
  },
  {
    label: "Current Streak",
    value: "0 days",
    icon: Flame,
    color: "text-leetcode",
    gradient: "from-leetcode/20 to-leetcode/5",
    borderColor: "border-leetcode/20",
  },
  {
    label: "Level",
    value: "Beginner",
    icon: Trophy,
    color: "text-codeforces",
    gradient: "from-codeforces/20 to-codeforces/5",
    borderColor: "border-codeforces/20",
  },
  {
    label: "Longest Streak",
    value: "0 days",
    icon: Zap,
    color: "text-longest-streak",
    gradient: "from-longest-streak/20 to-longest-streak/5",
    borderColor: "border-longest-streak/20",
  },
];

export function HeroStats({ stats: externalStats }: { stats?: any }) {
  const stats = externalStats || {
    totalProblems: 0,
    currentStreak: 0,
    longestStreak: 0,
    level: "Beginner",
  };

  const cards = statCards.map((c) => {
    if (c.label === "Total Problems") return { ...c, value: stats.totalProblems };
    if (c.label === "Current Streak") return { ...c, value: `${stats.currentStreak} days` };
    if (c.label === "Level") return { ...c, value: stats.level };
    if (c.label === "Longest Streak") return { ...c, value: `${stats.longestStreak} days` };
    return c;
  });

  const earnedCount = 0;

  return (
    <div className="space-y-3 md:space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {cards.map((card, i) => (
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
                <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest font-bold">
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

      {/* Badges Section - Empty State */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="rounded-3xl border border-border/40 bg-card/60 backdrop-blur-2xl p-6 shadow-xl relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="flex items-center justify-between mb-6 relative">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
              <Award className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-base font-heading font-bold text-foreground">Your Achievements</h3>
              <p className="text-[11px] text-muted-foreground font-mono mt-0.5">
                0 badges unlocked
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center py-10 rounded-2xl border-2 border-dashed border-border/40 bg-muted/5 relative">
          <div className="p-3 rounded-full bg-muted/20 mb-3">
             <Code2 className="h-6 w-6 text-muted-foreground/40" />
          </div>
          <p className="text-sm font-heading font-semibold text-foreground/80">No badges earned yet</p>
          <p className="text-[10px] text-muted-foreground font-mono mt-1">Complete challenges to unlock your first badge!</p>
        </div>
      </motion.div>
    </div>
  );
}
