import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Problem {
  id: number;
  title: string;
  platform: "leetcode" | "codeforces" | "codechef";
  difficulty: "Easy" | "Medium" | "Hard";
  url: string;
}

interface ProblemCardProps {
  problem: Problem;
}

export function ProblemCard({ problem }: ProblemCardProps) {
  const handleSolve = () => {
    window.open(problem.url, "_blank");
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "Medium":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "Hard":
        return "bg-rose-500/10 text-rose-500 border-rose-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getPlatformClass = (platform: string) => {
    switch (platform) {
      case "leetcode":
        return "text-[#FFA116] border-[#FFA116]/20 bg-[#FFA116]/10";
      case "codeforces":
        return "text-[#188AD2] border-[#188AD2]/20 bg-[#188AD2]/10";
      case "codechef":
        return "text-[#5B4638] border-[#5B4638]/20 bg-[#5B4638]/10";
      default:
        return "";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      layout
      className="glass group relative overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20"
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-heading text-lg font-semibold leading-tight text-foreground transition-colors group-hover:text-primary">
            {problem.title}
          </h3>
          <Badge className={cn("capitalize", getPlatformClass(problem.platform))}>
            {problem.platform}
          </Badge>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <Badge variant="outline" className={cn("font-mono font-medium", getDifficultyColor(problem.difficulty))}>
            {problem.difficulty}
          </Badge>
          
          <Button
            size="sm"
            onClick={handleSolve}
            className="h-8 gap-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            Solve
            <ExternalLink className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
      
      {/* Decorative accent */}
      <div className={cn(
        "absolute bottom-0 left-0 h-1 w-0 bg-primary transition-all duration-500 group-hover:w-full",
        problem.platform === 'leetcode' && 'bg-[#FFA116]',
        problem.platform === 'codeforces' && 'bg-[#188AD2]',
        problem.platform === 'codechef' && 'bg-[#5B4638]'
      )} />
    </motion.div>
  );
}
