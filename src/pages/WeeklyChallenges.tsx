import { motion } from "framer-motion";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/DashboardLayout";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CalendarRange, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { completeChallenge, fetchChallenges } from "@/services/challenges";

export default function WeeklyChallenges() {
  const qc = useQueryClient();
  const { data: challenges, isLoading } = useQuery({
    queryKey: ["challenges"],
    queryFn: fetchChallenges,
  });
  const complete = useMutation({
    mutationFn: completeChallenge,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["challenges"] });
    },
  });

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl space-y-6">
        <PageHeader
          title="Weekly Challenges"
          description="Stay accountable with clear weekly goals and visible progress."
        />

        <Card className="rounded-2xl border-border/60 bg-card/60 backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/50 bg-muted/30">
              <CalendarRange className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="font-heading text-base">This week</CardTitle>
              <CardDescription className="font-mono text-xs">
                Progress resets every Monday · UI-only completion for demo
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4 pt-2 sm:grid-cols-1">
            {isLoading ? (
              <div className="rounded-2xl border border-border/50 bg-background/40 p-4 font-mono text-sm text-muted-foreground">
                Loading challenges…
              </div>
            ) : !challenges || challenges.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border/50 bg-background/40 p-6 text-center">
                <p className="font-mono text-sm text-muted-foreground">No weekly challenges yet.</p>
                <p className="mt-2 font-mono text-[10px] text-muted-foreground">
                  Create challenges for your user in MongoDB to see them here.
                </p>
              </div>
            ) : (
              challenges.map((goal, i) => {
              const pct = goal.target ? Math.min(100, Math.round((goal.current / goal.target) * 100)) : 0;
              const isDone = !!goal.completed;

              return (
                <motion.div
                  key={goal._id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className={cn(
                    "rounded-2xl border border-border/50 bg-background/40 p-4 transition-colors",
                    isDone && "border-primary/25 bg-primary/5",
                  )}
                >
                  <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{goal.label}</p>
                      <p className="mt-1 font-mono text-xs text-muted-foreground">
                        {goal.current} / {goal.target}
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant={isDone ? "secondary" : "outline"}
                      size="sm"
                      className="shrink-0 rounded-xl font-mono text-xs"
                      onClick={() => complete.mutate(goal._id)}
                      disabled={complete.isPending || isDone}
                    >
                      {isDone ? (
                        <>
                          <CheckCircle2 className="mr-2 h-3.5 w-3.5 text-green-400" />
                          Completed
                        </>
                      ) : (
                        "Mark complete"
                      )}
                    </Button>
                  </div>
                  <Progress value={isDone ? 100 : pct} className="h-2" />
                  <p className="mt-2 text-right font-mono text-[10px] text-muted-foreground">
                    {isDone ? "100%" : `${pct}%`}
                  </p>
                </motion.div>
              );
            })
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
