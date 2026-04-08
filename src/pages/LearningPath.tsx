import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardLayout } from "@/components/DashboardLayout";
import { PageHeader } from "@/components/PageHeader";
import { BookOpen, ChevronDown, ChevronRight, CheckCircle2, Circle, Lock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchLearningPath, type Difficulty } from "@/services/learningPath";

const difficultyColors: Record<Difficulty, { bg: string; text: string; label: string }> = {
  beginner: { bg: "bg-green-500/10 border-green-500/20", text: "text-green-400", label: "Beginner" },
  intermediate: { bg: "bg-yellow-500/10 border-yellow-500/20", text: "text-yellow-400", label: "Intermediate" },
  advanced: { bg: "bg-red-500/10 border-red-500/20", text: "text-red-400", label: "Advanced" },
};

type LevelFilter = Difficulty | "all";

export default function LearningPath() {
  const [filter, setFilter] = useState<LevelFilter>("all");
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["learningPath"],
    queryFn: fetchLearningPath,
  });

  const learningSheets = data?.sheets || [];
  const learningTopics = data?.topics || [];

  const filteredSheets = useMemo(() => {
    if (filter === "all") return learningSheets;
    return learningSheets.filter((s) => s.level === filter);
  }, [filter, learningSheets]);

  const filteredTopics = useMemo(() => {
    if (filter === "all") return learningTopics;
    return learningTopics.filter((t) => t.difficulty === filter);
  }, [filter, learningTopics]);

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <PageHeader
            title="Learning Path"
            description="Structured roadmap from beginner to advanced"
          />
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:min-w-[220px]">
            <Label htmlFor="level-filter" className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Level
            </Label>
            <Select value={filter} onValueChange={(v) => setFilter(v as LevelFilter)}>
              <SelectTrigger
                id="level-filter"
                className="h-10 rounded-xl border-border/60 bg-card/60 font-mono text-xs backdrop-blur-xl"
              >
                <SelectValue placeholder="All levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="font-mono text-xs">
                  All levels
                </SelectItem>
                <SelectItem value="beginner" className="font-mono text-xs">
                  Beginner
                </SelectItem>
                <SelectItem value="intermediate" className="font-mono text-xs">
                  Intermediate
                </SelectItem>
                <SelectItem value="advanced" className="font-mono text-xs">
                  Advanced
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Sheets */}
        {isLoading ? (
          <div className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl p-6 text-center font-mono text-sm text-muted-foreground">
            Loading learning path…
          </div>
        ) : (
        <AnimatePresence mode="popLayout">
          <motion.div
            key={filter}
            layout
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {filteredSheets.map((sheet, i) => {
              const pct = Math.round((sheet.solved / sheet.totalProblems) * 100);
              const levelStyle = difficultyColors[sheet.level];
              return (
                <motion.div
                  key={sheet._id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ delay: i * 0.05 }}
                  className="cursor-pointer rounded-2xl border border-border/60 bg-card/60 p-4 backdrop-blur-xl transition-all hover:border-primary/30"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <h3 className="truncate font-heading text-sm font-semibold text-foreground">{sheet.name}</h3>
                  </div>
                  <span
                    className={`mb-2 inline-flex rounded-full border px-2 py-0.5 font-mono text-[9px] ${levelStyle.bg} ${levelStyle.text}`}
                  >
                    {levelStyle.label}
                  </span>
                  <p className="mb-3 font-mono text-[10px] text-muted-foreground">{sheet.description}</p>
                  <Progress value={pct} className="mb-2 h-1.5" />
                  <div className="flex justify-between font-mono text-[10px] text-muted-foreground">
                    <span>
                      {sheet.solved}/{sheet.totalProblems} solved
                    </span>
                    <span className="font-semibold text-primary">{pct}%</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
        )}

        {filteredSheets.length === 0 && (
          <p className="rounded-2xl border border-dashed border-border/50 bg-muted/10 px-4 py-6 text-center font-mono text-sm text-muted-foreground">
            No sheets for this level. Try another filter.
          </p>
        )}

        {/* Topics Roadmap */}
        <AnimatePresence mode="popLayout">
          <motion.div key={filter} layout className="space-y-3">
            {filteredTopics.map((topic, i) => {
              const pct = Math.round((topic.solved / topic.totalProblems) * 100);
              const isExpanded = expandedTopic === topic._id;
              const dc = difficultyColors[topic.difficulty];

              return (
                <motion.div
                  key={topic._id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="overflow-hidden rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedTopic(isExpanded ? null : topic._id)}
                    className="flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-muted/20"
                  >
                    <span className="text-2xl">{topic.icon}</span>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <h3 className="font-heading text-sm font-semibold text-foreground">{topic.name}</h3>
                        <span className={`rounded-full border px-2 py-0.5 font-mono text-[9px] ${dc.bg} ${dc.text}`}>
                          {dc.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Progress value={pct} className="h-1.5 max-w-[200px] flex-1" />
                        <span className="font-mono text-[10px] text-muted-foreground">
                          {topic.solved}/{topic.totalProblems}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`font-mono text-sm font-bold ${pct === 100 ? "text-green-400" : "text-primary"}`}
                    >
                      {pct}%
                    </span>
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                    )}
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
                        <div className="space-y-2 border-t border-border/30 px-4 pb-4 pt-1">
                          {topic.subtopics.map((sub) => {
                            const subPct = Math.round((sub.solved / sub.total) * 100);
                            return (
                              <div
                                key={sub.name}
                                className="flex items-center gap-3 rounded-xl bg-muted/20 px-3 py-2 transition-colors hover:bg-muted/30"
                              >
                                {subPct === 100 ? (
                                  <CheckCircle2 className="h-4 w-4 shrink-0 text-green-400" />
                                ) : subPct > 0 ? (
                                  <Circle className="h-4 w-4 shrink-0 text-primary" />
                                ) : (
                                  <Lock className="h-4 w-4 shrink-0 text-muted-foreground/50" />
                                )}
                                <span className="flex-1 font-mono text-xs text-foreground">{sub.name}</span>
                                <span className="font-mono text-[10px] text-muted-foreground">
                                  {sub.solved}/{sub.total}
                                </span>
                                <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted/60">
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
          </motion.div>
        </AnimatePresence>

        {filteredTopics.length === 0 && (
          <p className="rounded-2xl border border-dashed border-border/50 bg-muted/10 px-4 py-6 text-center font-mono text-sm text-muted-foreground">
            No topics for this level.
          </p>
        )}
      </div>
    </DashboardLayout>
  );
}
