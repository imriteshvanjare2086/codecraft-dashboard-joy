import { motion } from "framer-motion";
import { AlertTriangle, Lightbulb, ArrowRight } from "lucide-react";
import { weakTopics, recommendations } from "@/lib/mockData";

export function Insights() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
      {/* Weak Topics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl p-5"
      >
        <div className="flex items-center gap-2.5 mb-5">
          <div className="p-1.5 rounded-lg bg-destructive/10">
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </div>
          <h3 className="text-sm font-heading font-semibold text-foreground">Weak Topics</h3>
        </div>
        <div className="space-y-4">
          {weakTopics.map((topic, i) => (
            <motion.div
              key={topic.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.05 }}
            >
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-foreground font-mono">{topic.name}</span>
                <span className={`font-mono font-semibold ${topic.accuracy < 35 ? "text-destructive" : "text-leetcode"}`}>
                  {topic.accuracy}%
                </span>
              </div>
              <div className="h-2 rounded-full bg-muted/80 overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${topic.accuracy < 35 ? "bg-destructive/70" : "bg-leetcode/70"}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${topic.accuracy}%` }}
                  transition={{ delay: 0.9 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75 }}
        className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl p-5"
      >
        <div className="flex items-center gap-2.5 mb-5">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Lightbulb className="h-4 w-4 text-primary" />
          </div>
          <h3 className="text-sm font-heading font-semibold text-foreground">Recommendations</h3>
        </div>
        <div className="space-y-2.5">
          {recommendations.map((rec, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.85 + i * 0.05 }}
              className="group flex items-center gap-3 rounded-xl bg-muted/40 hover:bg-muted/60 border border-border/30 p-3.5 text-xs text-secondary-foreground font-mono transition-all duration-200 cursor-pointer"
            >
              <ArrowRight className="h-3.5 w-3.5 text-primary shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
              <span className="flex-1">{rec}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
