import { motion } from "framer-motion";
import { Lightbulb, Zap, TrendingDown, Flame, ArrowRight, Brain } from "lucide-react";
import { weakTopics, heroStats } from "@/lib/mockData";

interface SmartSuggestion {
  type: "weak-topic" | "streak" | "performance" | "daily";
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
  urgency: "high" | "medium" | "low";
}

function generateSmartSuggestions(): SmartSuggestion[] {
  const suggestions: SmartSuggestion[] = [];

  // Based on weak topics
  const weakest = [...weakTopics].sort((a, b) => a.accuracy - b.accuracy);
  if (weakest.length > 0) {
    suggestions.push({
      type: "weak-topic",
      icon: <TrendingDown className="h-4 w-4" />,
      title: `Improve ${weakest[0].name}`,
      description: `Your accuracy is only ${weakest[0].accuracy}% — well below average.`,
      action: `Solve 3 easy ${weakest[0].name} problems today`,
      urgency: weakest[0].accuracy < 35 ? "high" : "medium",
    });
  }
  if (weakest.length > 1) {
    suggestions.push({
      type: "weak-topic",
      icon: <Brain className="h-4 w-4" />,
      title: `Practice ${weakest[1].name}`,
      description: `${weakest[1].accuracy}% accuracy needs work. Focus on patterns.`,
      action: `Attempt 2 medium ${weakest[1].name} problems`,
      urgency: "medium",
    });
  }

  // Based on streak
  if (heroStats.streak > 0 && heroStats.streak < heroStats.longestStreak) {
    suggestions.push({
      type: "streak",
      icon: <Flame className="h-4 w-4" />,
      title: "Keep your streak alive!",
      description: `${heroStats.longestStreak - heroStats.streak} days to beat your best streak of ${heroStats.longestStreak} days.`,
      action: "Solve at least 1 problem today",
      urgency: "high",
    });
  }

  // Performance suggestion
  suggestions.push({
    type: "performance",
    icon: <Zap className="h-4 w-4" />,
    title: "Contest prep",
    description: "Your Codeforces rating dropped last contest. Review the problems.",
    action: "Upsolve 2 problems from Round 930",
    urgency: "medium",
  });

  // Daily suggestion
  suggestions.push({
    type: "daily",
    icon: <Lightbulb className="h-4 w-4" />,
    title: "Daily challenge",
    description: "Mixed difficulty problems to keep your skills sharp.",
    action: "Try today's LeetCode daily + 1 CF problem",
    urgency: "low",
  });

  return suggestions;
}

const urgencyStyles = {
  high: "border-red-500/20 bg-red-500/5",
  medium: "border-yellow-500/20 bg-yellow-500/5",
  low: "border-primary/20 bg-primary/5",
};

const urgencyDot = {
  high: "bg-red-400",
  medium: "bg-yellow-400",
  low: "bg-primary",
};

export function SmartRecommendations() {
  const suggestions = generateSmartSuggestions();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.75 }}
      className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl p-5"
    >
      <div className="flex items-center gap-2.5 mb-5">
        <div className="p-1.5 rounded-lg bg-primary/10">
          <Brain className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-heading font-semibold text-foreground">Smart Recommendations</h3>
          <p className="text-[10px] text-muted-foreground font-mono mt-0.5">Personalized based on your performance</p>
        </div>
      </div>

      <div className="space-y-2.5">
        {suggestions.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + i * 0.06 }}
            className={`group rounded-xl border p-3.5 cursor-pointer transition-all duration-200 hover:scale-[1.01] ${urgencyStyles[s.urgency]}`}
          >
            <div className="flex items-start gap-3">
              <div className={`mt-0.5 p-1 rounded-md ${s.urgency === "high" ? "text-red-400" : s.urgency === "medium" ? "text-yellow-400" : "text-primary"}`}>
                {s.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-heading font-semibold text-foreground">{s.title}</span>
                  <div className={`h-1.5 w-1.5 rounded-full ${urgencyDot[s.urgency]}`} />
                </div>
                <p className="text-[10px] text-muted-foreground font-mono mb-1.5">{s.description}</p>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-primary group-hover:text-primary/80">
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  <span>{s.action}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
