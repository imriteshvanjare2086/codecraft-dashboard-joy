import { useMemo } from "react";
import { motion } from "framer-motion";
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

export function ContributionGraph() {
  const data = useMemo(() => generateContributionData(), []);
  const totalActive = data.filter((d) => d.count > 0).length;

  // Group by weeks (columns)
  const weeks: { date: string; count: number }[][] = [];
  let currentWeek: { date: string; count: number }[] = [];

  data.forEach((d, i) => {
    const dayOfWeek = new Date(d.date).getDay();
    if (i === 0) {
      // pad start
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="rounded-xl border border-border bg-card p-4 md:p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-heading font-semibold text-foreground">
          Contribution Activity
        </h3>
        <span className="text-xs text-muted-foreground font-mono">
          {totalActive} active days
        </span>
      </div>
      <div className="overflow-x-auto">
        <div className="flex gap-[3px] min-w-[720px]">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((day, di) => (
                <div
                  key={di}
                  className={`h-[13px] w-[13px] rounded-sm contrib-cell ${
                    day.count < 0 ? "opacity-0" : levelColors[getLevel(day.count)]
                  }`}
                  style={{ animationDelay: `${(wi * 7 + di) * 2}ms` }}
                  title={day.date ? `${day.date}: ${day.count} problems` : ""}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-1 mt-3 justify-end">
        <span className="text-[10px] text-muted-foreground mr-1">Less</span>
        {levelColors.map((c, i) => (
          <div key={i} className={`h-[11px] w-[11px] rounded-sm ${c}`} />
        ))}
        <span className="text-[10px] text-muted-foreground ml-1">More</span>
      </div>
    </motion.div>
  );
}
