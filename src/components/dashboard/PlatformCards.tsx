import { motion } from "framer-motion";
import { useDashboard } from "@/hooks/useDashboard";
import { Star, TrendingUp, Award, Hash } from "lucide-react";

function StatBox({ label, value, color }: { label: string; value: string | number; color: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-background/40 border border-border/40 backdrop-blur-sm shadow-inner">
      <span className={`text-2xl font-black font-heading ${color}`}>{value}</span>
      <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono font-bold mt-1">{label}</span>
    </div>
  );
}

function PlatformCard({ 
  name, 
  icon: Icon, 
  colorClass, 
  borderColor, 
  gradientColor, 
  stats, 
  delay 
}: { 
  name: string; 
  icon: any; 
  colorClass: string; 
  borderColor: string; 
  gradientColor: string; 
  stats: { solved: number; rating: number; contests: number };
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -4 }}
      className={`group relative rounded-3xl border ${borderColor} bg-gradient-to-br ${gradientColor} p-6 backdrop-blur-md overflow-hidden card-hover`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
      
      <div className="relative">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className={`h-10 w-10 rounded-xl bg-background/50 border ${borderColor} flex items-center justify-center shadow-inner`}>
              <Icon className={`h-5 w-5 ${colorClass}`} />
            </div>
            <h3 className="text-base font-heading font-bold text-foreground">{name}</h3>
          </div>
          <div className={`px-2 py-1 rounded-full bg-background/30 border ${borderColor} text-[10px] font-mono ${colorClass} font-bold`}>
            ACTIVE
          </div>
        </div>

        <div className="mb-8 text-center">
          <p className="text-[11px] text-muted-foreground uppercase tracking-[0.2em] font-mono font-black mb-1">Total Problems Solved</p>
          <p className={`text-6xl font-black font-heading ${colorClass} tracking-tighter`}>
            {stats.solved}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <StatBox label="Contest Rating" value={stats.rating} color={colorClass} />
          <StatBox label="Total Contests" value={stats.contests} color={colorClass} />
        </div>
      </div>
    </motion.div>
  );
}

export function PlatformCards({ stats }: { stats?: any }) {
  const platforms = [
    {
      name: "LeetCode",
      icon: Hash,
      colorClass: "text-leetcode",
      borderColor: "border-leetcode/20",
      gradientColor: "from-leetcode/10 to-leetcode/5",
      stats: {
        solved: stats?.leetcode || 0,
        rating: 0,
        contests: 0
      },
      delay: 0.4
    },
    {
      name: "Codeforces",
      icon: TrendingUp,
      colorClass: "text-codeforces",
      borderColor: "border-codeforces/20",
      gradientColor: "from-codeforces/10 to-codeforces/5",
      stats: {
        solved: stats?.codeforces || 0,
        rating: 0,
        contests: 0
      },
      delay: 0.5
    },
    {
      name: "CodeChef",
      icon: Award,
      colorClass: "text-codechef",
      borderColor: "border-codechef/20",
      gradientColor: "from-codechef/10 to-codechef/5",
      stats: {
        solved: stats?.codechef || 0,
        rating: 0,
        contests: 0
      },
      delay: 0.6
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {platforms.map((p) => (
        <PlatformCard key={p.name} {...p} />
      ))}
    </div>
  );
}
