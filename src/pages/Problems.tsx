import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/DashboardLayout";
import { problemTopics, problemSheets, type Platform, type ProblemDifficulty, type ProblemStatus } from "@/lib/problemsData";
import { useProblems, useSetProblemStatus } from "@/hooks/useProblems";
import { Search, Filter, ExternalLink, CheckCircle2, AlertCircle, Circle } from "lucide-react";

const platformColors: Record<Platform, string> = {
  leetcode: "bg-leetcode/10 text-leetcode border-leetcode/20",
  codeforces: "bg-codeforces/10 text-codeforces border-codeforces/20",
  codechef: "bg-codechef/10 text-codechef border-codechef/20",
};

const diffColors: Record<ProblemDifficulty, string> = {
  easy: "text-green-400",
  medium: "text-yellow-400",
  hard: "text-red-400",
};

const statusIcons: Record<ProblemStatus, React.ReactNode> = {
  solved: <CheckCircle2 className="h-4 w-4 text-green-400" />,
  attempted: <AlertCircle className="h-4 w-4 text-yellow-400" />,
  unsolved: <Circle className="h-4 w-4 text-muted-foreground/40" />,
};

export default function Problems() {
  const { data: problems = [] } = useProblems();
  const setStatus = useSetProblemStatus();

  const [search, setSearch] = useState("");
  const [platformFilter, setPlatformFilter] = useState<Platform | "all">("all");
  const [diffFilter, setDiffFilter] = useState<ProblemDifficulty | "all">("all");
  const [topicFilter, setTopicFilter] = useState("all");
  const [sheetFilter, setSheetFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState<ProblemStatus | "all">("all");

  const filtered = useMemo(() => {
    return problems.filter((p: any) => {
      if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (platformFilter !== "all" && p.platform !== platformFilter) return false;
      if (diffFilter !== "all" && p.difficulty !== diffFilter) return false;
      if (topicFilter !== "all" && p.topic !== topicFilter) return false;
      if (sheetFilter !== "All" && p.sheet !== sheetFilter) return false;
      if (statusFilter !== "all" && p.status !== statusFilter) return false;
      return true;
    });
  }, [problems, search, platformFilter, diffFilter, topicFilter, sheetFilter, statusFilter]);

  const stats = {
    total: problems.length,
    solved: problems.filter((p: any) => p.status === "solved").length,
    attempted: problems.filter((p: any) => p.status === "attempted").length,
  };

  const cycleStatus = (s: ProblemStatus) => (s === "unsolved" ? "attempted" : s === "attempted" ? "solved" : "unsolved");

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-5">
        <div>
          <h1 className="text-2xl font-bold font-heading text-foreground">Problems</h1>
          <p className="text-sm text-muted-foreground font-mono mt-1">
            {stats.solved} solved · {stats.attempted} attempted · {stats.total} total
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search problems..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card/60 border border-border/60 text-sm font-mono text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/40 backdrop-blur-xl"
          />
        </div>

        {/* Filters */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
            <Filter className="h-3 w-3" /> Filters
          </div>

          <div className="flex flex-wrap gap-2">
            {/* Platform */}
            {(["all", "leetcode", "codeforces", "codechef"] as const).map((p) => (
              <button key={p} onClick={() => setPlatformFilter(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${platformFilter === p ? (p === "all" ? "bg-primary/20 text-primary border-primary/30" : platformColors[p]) : "bg-muted/30 text-muted-foreground border-border/30 hover:bg-muted/50"}`}
              >
                {p === "all" ? "All Platforms" : p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {(["all", "easy", "medium", "hard"] as const).map((d) => (
              <button key={d} onClick={() => setDiffFilter(d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${diffFilter === d ? "bg-primary/20 text-primary border-primary/30" : "bg-muted/30 text-muted-foreground border-border/30 hover:bg-muted/50"}`}
              >
                {d === "all" ? "All Difficulty" : d.charAt(0).toUpperCase() + d.slice(1)}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <button onClick={() => setTopicFilter("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${topicFilter === "all" ? "bg-primary/20 text-primary border-primary/30" : "bg-muted/30 text-muted-foreground border-border/30 hover:bg-muted/50"}`}
            >
              All Topics
            </button>
            {problemTopics.map((t) => (
              <button key={t} onClick={() => setTopicFilter(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${topicFilter === t ? "bg-primary/20 text-primary border-primary/30" : "bg-muted/30 text-muted-foreground border-border/30 hover:bg-muted/50"}`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {problemSheets.map((s) => (
              <button key={s} onClick={() => setSheetFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${sheetFilter === s ? "bg-primary/20 text-primary border-primary/30" : "bg-muted/30 text-muted-foreground border-border/30 hover:bg-muted/50"}`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {(["all", "solved", "attempted", "unsolved"] as const).map((s) => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${statusFilter === s ? "bg-primary/20 text-primary border-primary/30" : "bg-muted/30 text-muted-foreground border-border/30 hover:bg-muted/50"}`}
              >
                {s === "all" ? "All Status" : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Problem List */}
        <div className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl overflow-hidden">
          <div className="grid grid-cols-[32px_1fr_90px_80px_80px_80px_32px] gap-2 px-4 py-3 border-b border-border/30 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            <span></span>
            <span>Problem</span>
            <span>Platform</span>
            <span>Difficulty</span>
            <span>Topic</span>
            <span>Sheet</span>
            <span></span>
          </div>

          <div className="divide-y divide-border/20">
            {filtered.map((problem, i) => (
              <motion.div
                key={problem.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.02 }}
                className="grid grid-cols-[32px_1fr_90px_80px_80px_80px_32px] gap-2 px-4 py-3 items-center hover:bg-muted/10 transition-colors"
              >
                <button
                  className="w-fit"
                  title="Click to change status"
                  onClick={() => setStatus.mutate({ id: problem.id, status: cycleStatus(problem.status) })}
                  disabled={setStatus.isPending}
                >
                  {statusIcons[problem.status]}
                </button>
                <span className="text-sm font-mono text-foreground truncate">{problem.title}</span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border w-fit ${platformColors[problem.platform]}`}>
                  {problem.platform === "leetcode" ? "LC" : problem.platform === "codeforces" ? "CF" : "CC"}
                </span>
                <span className={`text-xs font-mono font-semibold ${diffColors[problem.difficulty]}`}>
                  {problem.difficulty}
                </span>
                <span className="text-[10px] font-mono text-muted-foreground truncate">{problem.topic}</span>
                <span className="text-[10px] font-mono text-muted-foreground truncate">{problem.sheet}</span>
                <a href={problem.url || "#"} target="_blank" rel="noreferrer">
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground/40 hover:text-primary cursor-pointer transition-colors" />
                </a>
              </motion.div>
            ))}
            {filtered.length === 0 && (
              <div className="px-4 py-8 text-center text-sm text-muted-foreground font-mono">No problems match your filters</div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
