import { useMemo } from "react";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { generateContributionData } from "@/lib/mockData";

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
const DAY_LABELS = ["Sun", "", "Tue", "", "Thu", "", "Sat"];

export function ContributionGraph() {
  const data = useMemo(() => generateContributionData(), []);
  const totalActive = data.filter((d) => d.count > 0).length;
  const totalProblems = data.reduce((sum, d) => sum + d.count, 0);

  // Group into weeks
  const weeks: { date: string; count: number }[][] = [];
  let currentWeek: { date: string; count: number }[] = [];

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

  // Calculate month label positions
  const monthPositions = useMemo(() => {
    const positions: { label: string; col: number }[] = [];
    let lastMonth = -1;
    weeks.forEach((week, wi) => {
      // Find the first real day in this week
      const firstReal = week.find((d) => d.date !== "");
      if (firstReal) {
        const month = new Date(firstReal.date).getMonth();
        if (month !== lastMonth) {
          positions.push({ label: MONTH_LABELS[month], col: wi });
          lastMonth = month;
        }
      }
    });
    return positions;
  }, [weeks]);

  const cellSize = 13;
  const gap = 3;

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
        <div className="min-w-[720px]">
          {/* Month labels */}
          <div className="flex mb-1.5" style={{ paddingLeft: 32 }}>
            {monthPositions.map((m, i) => {
              const nextCol = i < monthPositions.length - 1 ? monthPositions[i + 1].col : weeks.length;
              const widthCols = nextCol - m.col;
              return (
                <span
                  key={`${m.label}-${m.col}`}
                  className="text-[10px] text-muted-foreground font-mono"
                  style={{ width: widthCols * (cellSize + gap), flexShrink: 0 }}
                >
                  {m.label}
                </span>
              );
            })}
          </div>

          <div className="flex">
            {/* Day labels */}
            <div className="flex flex-col gap-[3px] mr-2 shrink-0" style={{ width: 24 }}>
              {DAY_LABELS.map((label, i) => (
                <div key={i} className="h-[13px] flex items-center">
                  <span className="text-[9px] text-muted-foreground font-mono">{label}</span>
                </div>
              ))}
            </div>

            {/* Grid */}
            <div className="flex gap-[3px]">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((day, di) => (
                    <div
                      key={di}
                      className={`h-[13px] w-[13px] rounded-[3px] contrib-cell transition-all duration-200 ${
                        day.count < 0 ? "opacity-0" : levelColors[getLevel(day.count)]
                      } ${day.count > 0 ? "hover:ring-1 hover:ring-primary/40 hover:scale-125 cursor-pointer" : ""}`}
                      style={{ animationDelay: `${(wi * 7 + di) * 2}ms` }}
                      title={day.date ? `${day.date}: ${day.count} problems` : ""}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
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
