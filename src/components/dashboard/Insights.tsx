import { motion } from "framer-motion";
import { AlertTriangle, Lightbulb } from "lucide-react";
import { weakTopics, recommendations } from "@/lib/mockData";

export function Insights() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
      {/* Weak Topics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="rounded-xl border border-border bg-card p-4 md:p-5"
      >
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="h-4 w-4 text-leetcode" />
          <h3 className="text-sm font-heading font-semibold text-foreground">Weak Topics</h3>
        </div>
        <div className="space-y-3">
          {weakTopics.map((topic) => (
            <div key={topic.name}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-foreground font-mono">{topic.name}</span>
                <span className="text-muted-foreground font-mono">{topic.accuracy}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-destructive/70"
                  style={{ width: `${topic.accuracy}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75 }}
        className="rounded-xl border border-border bg-card p-4 md:p-5"
      >
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-heading font-semibold text-foreground">Recommendations</h3>
        </div>
        <div className="space-y-2">
          {recommendations.map((rec, i) => (
            <div
              key={i}
              className="flex items-start gap-2 rounded-lg bg-muted/50 p-3 text-xs text-secondary-foreground font-mono"
            >
              <span className="text-primary font-bold mt-px">→</span>
              <span>{rec}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
