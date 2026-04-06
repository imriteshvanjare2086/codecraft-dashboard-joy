import { motion } from "framer-motion";
import { Flame, Trophy, Zap, Code2 } from "lucide-react";
import { heroStats } from "@/lib/mockData";

const cards = [
  {
    label: "Total Problems",
    value: heroStats.totalProblems,
    icon: Code2,
    color: "text-primary",
    glowClass: "card-glow-primary",
    gradient: "from-primary/20 to-primary/5",
    borderColor: "border-primary/20",
  },
  {
    label: "Current Streak",
    value: `${heroStats.streak} days`,
    icon: Flame,
    color: "text-leetcode",
    glowClass: "card-glow-leetcode",
    gradient: "from-leetcode/20 to-leetcode/5",
    borderColor: "border-leetcode/20",
  },
  {
    label: "Level",
    value: heroStats.level,
    icon: Trophy,
    color: "text-codeforces",
    glowClass: "card-glow-codeforces",
    gradient: "from-codeforces/20 to-codeforces/5",
    borderColor: "border-codeforces/20",
  },
  {
    label: "Score",
    value: heroStats.score.toLocaleString(),
    icon: Zap,
    color: "text-codechef",
    glowClass: "card-glow-codechef",
    gradient: "from-codechef/20 to-codechef/5",
    borderColor: "border-codechef/20",
  },
];

export function HeroStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className={`group relative rounded-2xl border ${card.borderColor} bg-gradient-to-br ${card.gradient} p-4 md:p-5 backdrop-blur-sm cursor-default transition-shadow duration-300 hover:${card.glowClass}`}
        >
          {/* Subtle shine effect */}
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
  );
}
