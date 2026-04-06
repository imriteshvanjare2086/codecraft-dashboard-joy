import { motion } from "framer-motion";
import { Target } from "lucide-react";
import { dailyGoal } from "@/lib/mockData";

export function GoalsSection() {
  const pct = (dailyGoal.completed / dailyGoal.target) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.85 }}
      className="rounded-xl border border-border bg-card p-4 md:p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <Target className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-heading font-semibold text-foreground">Daily Goal</h3>
      </div>
      <div className="flex items-end gap-4">
        <div className="flex-1">
          <p className="text-3xl font-bold font-heading text-foreground">
            {dailyGoal.completed}
            <span className="text-lg text-muted-foreground">/{dailyGoal.target}</span>
          </p>
          <p className="text-xs text-muted-foreground font-mono mt-1">{dailyGoal.label}</p>
          <div className="h-2 rounded-full bg-muted mt-3">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold font-heading text-primary">{Math.round(pct)}%</span>
        </div>
      </div>
    </motion.div>
  );
}
