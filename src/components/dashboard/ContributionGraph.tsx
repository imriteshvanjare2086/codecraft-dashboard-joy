import { Info } from "lucide-react";
import { useState, useEffect } from "react";

const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const LEVEL_COLORS = [
  "bg-muted/30 dark:bg-[#1f2328]",
  "bg-emerald-100 dark:bg-emerald-900/30",
  "bg-emerald-300 dark:bg-emerald-700/50",
  "bg-emerald-500 dark:bg-emerald-500/70",
  "bg-emerald-700 dark:bg-emerald-400"
];

export function ContributionGraph({ stats: externalStats }: { stats?: any }) {
  const stats = externalStats || { totalSubmissions: 0, activeDays: 0 };

  const getDayColor = (level: number) => {
    return LEVEL_COLORS[level] || LEVEL_COLORS[0];
  };

  return (
    <div className="rounded-2xl border border-border/40 bg-card p-6 shadow-sm text-foreground font-sans mt-4 transition-colors duration-300">
      {/* Top Header */}
      <div className="flex flex-col gap-1.5 mb-5 px-1">
        <h4 className="text-sm font-bold text-foreground tracking-wider">
          Contribution Graph
        </h4>
        <div className="flex items-center gap-1.5">
          <h3 className="text-xl font-bold tracking-tight text-foreground/60">
            {stats?.totalSubmissions !== undefined ? stats.totalSubmissions.toLocaleString() : "0"} submissions in the past one year
          </h3>
          <Info className="h-4 w-4 text-muted-foreground/50 cursor-pointer ml-1" />
        </div>
      </div>

      {/* Stats Row */}
      <div className="flex items-center justify-between mb-8 px-1">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground/60 uppercase tracking-wide font-bold">Total active</span>
          <span className="text-sm font-bold text-muted-foreground/80">days: {stats?.activeDays || 0}</span>
        </div>
      </div>

      {/* Grid Canvas - 12 Monthly Boxes with centered labels */}
      <div className="overflow-x-auto pb-4 custom-scrollbar">
        <div className="min-w-fit px-1">
          <div
            style={{
              display: "flex",
              gap: "12px", // Increased gap for better visual separation
            }}
          >
            {MONTH_LABELS.map((month) => (
              <div key={month} className="flex flex-col gap-2">
                {/* Centered Month Label */}
                <span className="text-[10px] text-muted-foreground font-bold font-mono uppercase tracking-wider text-center w-full">
                  {month}
                </span>
                
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 14px)", 
                    gridTemplateRows: "repeat(7, 14px)",
                    gap: "4px"
                  }}
                  className="rounded-md"
                >
                  {Array.from({ length: 4 * 7 }).map((_, i) => {
                    // Set all levels to 0 to remove dummy data marks
                    const level = 0;
                    return (
                      <div
                        key={i}
                        className={`${getDayColor(level)} w-[14px] h-[14px] rounded-[3px] border border-border/10 transition-colors duration-100 cursor-pointer hover:border-primary/50`}
                        title="No activity"
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-2 mt-2 px-1">
        <span className="text-[10px] text-muted-foreground font-mono">Less</span>
        <div className="flex gap-[4px]">
          {LEVEL_COLORS.map((colorClass, index) => (
            <div 
              key={index} 
              className={`w-[12px] h-[12px] rounded-[2px] ${colorClass}`} 
            />
          ))}
        </div>
        <span className="text-[10px] text-muted-foreground font-mono">More</span>
      </div>
    </div>
  );
}


