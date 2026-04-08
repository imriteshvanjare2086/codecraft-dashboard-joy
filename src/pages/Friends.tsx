import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/DashboardLayout";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Flame, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { fetchFriends } from "@/services/friends";

function initials(name: string) {
  return name
    .split("_")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Friends() {
  const { data: friends, isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: fetchFriends,
  });

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl space-y-6">
        <PageHeader
          title="Friends"
          description="Compare streaks and activity with your study circle."
        />

        {isLoading ? (
          <div className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl p-6 text-center font-mono text-sm text-muted-foreground">
            Loading friends…
          </div>
        ) : !friends || friends.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border/50 bg-muted/10 px-4 py-8 text-center">
            <p className="font-mono text-sm text-muted-foreground">No friends yet.</p>
            <p className="mt-2 font-mono text-[10px] text-muted-foreground">
              Use the Friends API to add/remove connections (UI wiring can come next).
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {friends.map((user, i) => (
            <motion.div
              key={user._id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="h-full rounded-2xl border-border/60 bg-card/60 backdrop-blur-xl transition-colors hover:border-primary/25">
                <CardHeader className="flex flex-row items-start gap-3 space-y-0 pb-2">
                  <Avatar className="h-11 w-11 rounded-xl border border-border/50">
                    <AvatarFallback className="rounded-xl bg-gradient-to-br from-primary/25 to-primary/5 font-mono text-xs font-bold text-primary">
                      {initials(user.username)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="truncate font-heading text-base">{user.username}</CardTitle>
                      <span
                        className={cn(
                          "inline-flex h-2 w-2 shrink-0 rounded-full",
                          user.online ? "bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]" : "bg-muted-foreground/40",
                        )}
                        title={user.online ? "Online" : "Offline"}
                        aria-label={user.online ? "Online" : "Offline"}
                      />
                    </div>
                    <p className="mt-1 font-mono text-[10px] text-muted-foreground">
                      {user.online ? "Online" : "Offline"}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="grid gap-3 pt-0">
                  <div className="grid grid-cols-2 gap-3 rounded-xl border border-border/40 bg-muted/20 p-3">
                    <div className="flex items-center gap-2">
                      <Flame className="h-4 w-4 text-orange-400" />
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Streak</p>
                        <p className="font-mono text-sm font-semibold text-foreground">{user.streak} days</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-primary" />
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Solved</p>
                        <p className="font-mono text-sm font-semibold text-foreground">{user.problemsSolved}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
