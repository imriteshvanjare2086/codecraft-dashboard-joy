import { useState } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { ratingHistory } from "@/lib/mockData";

type Platform = "codeforces" | "leetcode";

const platformConfig: Record<Platform, { label: string; color: string; cssColor: string }> = {
  codeforces: { label: "Codeforces", color: "hsl(215, 80%, 55%)", cssColor: "text-codeforces" },
  leetcode: { label: "LeetCode", color: "hsl(36, 100%, 50%)", cssColor: "text-leetcode" },
};

export function RatingGraph() {
  const [platform, setPlatform] = useState<Platform>("codeforces");
  const data = ratingHistory[platform];
  const config = platformConfig[platform];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.65 }}
      className="rounded-xl border border-border bg-card p-4 md:p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-heading font-semibold text-foreground">Rating History</h3>
        <div className="flex gap-1 rounded-lg bg-muted p-0.5">
          {(Object.keys(platformConfig) as Platform[]).map((p) => (
            <button
              key={p}
              onClick={() => setPlatform(p)}
              className={`px-3 py-1 rounded-md text-xs font-mono transition-colors ${
                platform === p
                  ? `bg-card ${platformConfig[p].cssColor} font-semibold`
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {platformConfig[p].label}
            </button>
          ))}
        </div>
      </div>
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(228, 10%, 18%)" />
            <XAxis
              dataKey="contest"
              tick={{ fontSize: 10, fill: "hsl(215, 12%, 50%)" }}
              axisLine={{ stroke: "hsl(228, 10%, 18%)" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "hsl(215, 12%, 50%)" }}
              axisLine={false}
              tickLine={false}
              domain={["dataMin - 50", "dataMax + 50"]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(228, 12%, 11%)",
                border: "1px solid hsl(228, 10%, 18%)",
                borderRadius: "8px",
                fontSize: "12px",
                fontFamily: "JetBrains Mono",
              }}
              labelStyle={{ color: "hsl(210, 20%, 92%)" }}
            />
            <Line
              type="monotone"
              dataKey="rating"
              stroke={config.color}
              strokeWidth={2}
              dot={{ fill: config.color, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 2, stroke: "hsl(228, 12%, 11%)" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
