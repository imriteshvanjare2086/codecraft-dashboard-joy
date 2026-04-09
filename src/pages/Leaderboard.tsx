import { DashboardLayout } from "@/components/DashboardLayout";
import { PageHeader } from "@/components/PageHeader";
import { useQuery } from "@tanstack/react-query";
import { getLeaderboard } from "@/services/user";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Flame, Target, Medal } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Leaderboard() {
  const { data: users, isLoading } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: getLeaderboard,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2: return <Medal className="h-5 w-5 text-slate-300" />;
      case 3: return <Medal className="h-5 w-5 text-amber-600" />;
      default: return <span className="text-muted-foreground font-mono">{rank}</span>;
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1: return "bg-yellow-500/10 border-yellow-500/20";
      case 2: return "bg-slate-300/10 border-slate-300/20";
      case 3: return "bg-amber-600/10 border-amber-600/20";
      default: return "";
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl space-y-8">
        <PageHeader 
          title="Leaderboard" 
          description="Global rankings based on total problems solved and consistency." 
        />

        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-16 w-full animate-pulse rounded-xl bg-muted/20" />
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-sm overflow-hidden"
          >
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="hover:bg-transparent border-border/40">
                  <TableHead className="w-[80px] text-center">Rank</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead className="text-right">Problems Solved</TableHead>
                  <TableHead className="text-right">Current Streak</TableHead>
                  <TableHead className="text-right">Platform Distribution</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users?.map((user, index) => (
                  <TableRow 
                    key={user._id} 
                    className={`border-border/20 transition-colors duration-200 hover:bg-muted/20 ${getRankStyle(index + 1)}`}
                  >
                    <TableCell className="text-center font-bold">
                      <div className="flex items-center justify-center">
                        {getRankIcon(index + 1)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Link 
                        to={`/dashboard/${user._id}`} 
                        className="flex items-center gap-3 group/user hover:opacity-80 transition-opacity"
                      >
                        <Avatar className="h-10 w-10 border border-border/40 shadow-sm group-hover/user:border-primary/50 transition-colors">
                          <AvatarImage src={(user as any).profileImage} />
                          <AvatarFallback className="bg-primary/10 text-primary uppercase font-bold text-xs">
                            {user.username.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-bold text-foreground group-hover/user:text-primary transition-colors">
                            {user.username}
                          </span>
                          <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">
                            {index === 0 ? "Grandmaster" : index < 3 ? "Master" : "Challenger"}
                          </span>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Target className="h-3.5 w-3.5 text-primary" />
                        <span className="font-heading font-bold text-lg">{user.problemsSolved}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Flame className={`h-3.5 w-3.5 ${user.streak > 0 ? "text-orange-500" : "text-muted-foreground/30"}`} />
                        <span className="font-mono font-bold">{user.streak}d</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {Object.entries(user.platformStats || {}).map(([platform, count]) => (
                          <Badge 
                            key={platform} 
                            variant="outline" 
                            className="bg-background/20 text-[10px] py-0 px-1.5 border-border/40"
                          >
                            {count as number}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {(!users || users.length === 0) && (
              <div className="py-20 text-center">
                <p className="text-muted-foreground font-mono text-sm">No users found on the leaderboard yet.</p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}

