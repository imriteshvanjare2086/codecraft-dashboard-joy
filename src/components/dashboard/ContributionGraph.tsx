import { useMemo } from "react";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { useDashboard } from "@/hooks/useDashboard";

function getLevel(count: number): number {
  if (count === 0) return 0;
  if (count <= 1) return 1;
  if (count <= 3) return 2;
  if (count <= 5) return 3;
  return 4;
}

const levelColors = [
  "bg-[hsl(var(--contrib-empty))]",
  "bg-[hsl(var(--contrib-l1))]",
  "bg-[hsl(var(--contrib-l2))]",
  "bg-[hsl(var(--contrib-l3))]",
  "bg-[hsl(var(--contrib-l4))]",
];

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

type DayCell = { date: string; count: number };

export function ContributionGraph() {
  const { data: dash } = useDashboard();
  const data = useMemo(() => dash?.contributionData || [], [dash]);
  const totalActive = data.filter((d) => d.count > 0).length;
  const totalProblems = data.reduce((sum, d) => sum + d.count, 0);

  const weeks: DayCell[][] = [];
  let currentWeek: DayCell[] = [];

  data.forEach((d, i) => {
    const dayOfWeek = new Date(d.date).getDay();
    if (i === 0) {
      for (let j = 0; j < dayOfWeek; j++) {
        currentWeek.push({ date: "", count: -1 });
      }
    }
    currentWeek.push(d);
    if (dayOfWeek === 6 || i === data.length - 1) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  const monthBlocks = useMemo(() => {
    const blocks: { label: string; weeks: DayCell[][] }[] = [];
    let currentMonth = -1;

    weeks.forEach((week) => {
      const firstReal = week.find((d) => d.date !== "");
      const month = firstReal ? new Date(firstReal.date).getMonth() : currentMonth;

      if (month !== currentMonth) {
        blocks.push({ label: MONTH_LABELS[month], weeks: [] });
        currentMonth = month;
      }
      blocks[blocks.length - 1].weeks.push(week);
    });

    return blocks;
  }, [weeks]);

  let globalWeekIdx = 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl p-5"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Activity className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-heading font-semibold text-foreground">Contribution Activity</h3>
            <p className="text-[10px] text-muted-foreground font-mono mt-0.5">{totalProblems} problems in the last year</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-lg font-bold font-heading text-foreground">{totalActive}</span>
          <p className="text-[10px] text-muted-foreground font-mono">active days</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="flex gap-2.5 min-w-[820px]">
          {monthBlocks.map((block) => {
            return (
              <div
                key={`${block.label}-${globalWeekIdx}`}
                className="flex flex-col rounded-xl bg-muted/40 border border-border/30 p-2.5"
              >
                <span className="text-[11px] text-foreground font-heading font-bold mb-2 pl-0.5 tracking-wide">
                  {block.label}
                </span>
                <div className="flex gap-[3px]">
                  {block.weeks.map((week, wi) => {
                    const weekKey = globalWeekIdx++;
                    return (
                      <div key={weekKey} className="flex flex-col gap-[3px]">
                        {week.map((day, di) => (
                          <div
                            key={di}
                            className={`h-[12px] w-[12px] rounded-[3px] contrib-cell transition-all duration-200 ${
                              day.count < 0 ? "opacity-0" : levelColors[getLevel(day.count)]
                            } ${day.count > 0 ? "hover:ring-1 hover:ring-primary/40 hover:scale-125 cursor-pointer" : ""}`}
                            style={{ animationDelay: `${(weekKey * 7 + di) * 2}ms` }}
                            title={day.date ? `${day.date}: ${day.count} problems` : ""}
                          />
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-1.5 mt-4 justify-end">
        <span className="text-[10px] text-muted-foreground mr-1 font-mono">Less</span>
        {levelColors.map((c, i) => (
          <div key={i} className={`h-[11px] w-[11px] rounded-[3px] ${c}`} />
        ))}
        <span className="text-[10px] text-muted-foreground ml-1 font-mono">More</span>
      </div>
    </motion.div>
  );
}
