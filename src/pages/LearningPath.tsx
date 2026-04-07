import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardLayout } from "@/components/DashboardLayout";
import { learningTopics, learningSheets, type Difficulty } from "@/lib/learningPathData";
import { BookOpen, ChevronDown, ChevronRight, CheckCircle2, Circle, Lock } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const difficultyColors: Record<Difficulty, { bg: string; text: string; label: string }> = {
  beginner: { bg: "bg-green-500/10 border-green-500/20", text: "text-green-400", label: "Beginner" },
  intermediate: { bg: "bg-yellow-500/10 border-yellow-500/20", text: "text-yellow-400", label: "Intermediate" },
  advanced: { bg: "bg-red-500/10 border-red-500/20", text: "text-red-400", label: "Advanced" },
};

const difficultyFilters: Difficulty[] = ["beginner", "intermediate", "advanced"];

export default function LearningPath() {
  const [filter, setFilter] = useState<Difficulty | "all">("all");
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

  const filtered = filter === "all" ? learningTopics : learningTopics.filter((t) => t.difficulty === filter);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-5">
        <div>
          <h1 className="text-2xl font-bold font-heading text-foreground">Learning Path</h1>
          <p className="text-sm text-muted-foreground font-mono mt-1">Structured roadmap from beginner to advanced</p>
        </div>

        {/* Sheets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {learningSheets.map((sheet, i) => {
            const pct = Math.round((sheet.solved / sheet.totalProblems) * 100);
            return (
              <motion.div
                key={sheet.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl p-4 cursor-pointer hover:border-primary/30 transition-all"
              >
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-heading font-semibold text-foreground truncate">{sheet.name}</h3>
                </div>
                <p className="text-[10px] text-muted-foreground font-mono mb-3">{sheet.description}</p>
                <Progress value={pct} className="h-1.5 mb-2" />
                <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
                  <span>{sheet.solved}/{sheet.totalProblems} solved</span>
                  <span className="text-primary font-semibold">{pct}%</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Difficulty Filter */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${filter === "all" ? "bg-primary/20 text-primary border border-primary/30" : "bg-muted/40 text-muted-foreground border border-border/30 hover:bg-muted/60"}`}
          >
            All Topics
          </button>
          {difficultyFilters.map((d) => (
            <button
              key={d}
              onClick={() => setFilter(d)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${filter === d ? `${difficultyColors[d].bg} ${difficultyColors[d].text} border` : "bg-muted/40 text-muted-foreground border border-border/30 hover:bg-muted/60"}`}
            >
              {difficultyColors[d].label}
            </button>
          ))}
        </div>

        {/* Topics Roadmap */}
        <div className="space-y-3">
          {filtered.map((topic, i) => {
            const pct = Math.round((topic.solved / topic.totalProblems) * 100);
            const isExpanded = expandedTopic === topic.id;
            const dc = difficultyColors[topic.difficulty];

            return (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl overflow-hidden"
              >
                <button
                  onClick={() => setExpandedTopic(isExpanded ? null : topic.id)}
                  className="w-full flex items-center gap-4 p-4 text-left hover:bg-muted/20 transition-colors"
                >
                  <span className="text-2xl">{topic.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-heading font-semibold text-foreground">{topic.name}</h3>
                      <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${dc.bg} ${dc.text}`}>
                        {dc.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Progress value={pct} className="h-1.5 flex-1 max-w-[200px]" />
                      <span className="text-[10px] font-mono text-muted-foreground">{topic.solved}/{topic.totalProblems}</span>
                    </div>
                  </div>
                  <span className={`text-sm font-mono font-bold ${pct === 100 ? "text-green-400" : "text-primary"}`}>{pct}%</span>
                  {isExpanded ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-1 space-y-2 border-t border-border/30">
                        {topic.subtopics.map((sub) => {
                          const subPct = Math.round((sub.solved / sub.total) * 100);
                          return (
                            <div key={sub.name} className="flex items-center gap-3 py-2 px-3 rounded-xl bg-muted/20 hover:bg-muted/30 transition-colors">
                              {subPct === 100 ? (
                                <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0" />
                              ) : subPct > 0 ? (
                                <Circle className="h-4 w-4 text-primary shrink-0" />
                              ) : (
                                <Lock className="h-4 w-4 text-muted-foreground/50 shrink-0" />
                              )}
                              <span className="text-xs font-mono text-foreground flex-1">{sub.name}</span>
                              <span className="text-[10px] font-mono text-muted-foreground">{sub.solved}/{sub.total}</span>
                              <div className="w-16 h-1.5 rounded-full bg-muted/60 overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${subPct === 100 ? "bg-green-400" : "bg-primary"}`}
                                  style={{ width: `${subPct}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
