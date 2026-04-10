import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/DashboardLayout";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Flame, 
  Trophy, 
  UserPlus, 
  Search, 
  Loader2, 
  CheckCircle2, 
  Target, 
  Medal, 
  LayoutGrid, 
  List 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { fetchFriends, searchUsers, addFriend, FriendUser } from "@/services/friends";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

function initials(name: string) {
  return name
    .split(/[\s_]+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Friends() {
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "leaderboard">("grid");
  const queryClient = useQueryClient();

  // 1. Fetch current friends
  const { data: friends, isLoading: isLoadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: fetchFriends,
  });

  // 2. Search users globally
  const { data: searchResults, isFetching: isSearching } = useQuery({
    queryKey: ["users-search", search],
    queryFn: () => searchUsers(search),
    enabled: search.length >= 2,
    staleTime: 500,
  });

  // 3. Add friend mutation
  const addMutation = useMutation({
    mutationFn: addFriend,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
      queryClient.invalidateQueries({ queryKey: ["users-search"] });
      toast.success("Friend added successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to add friend");
    }
  });

  const filteredFriends = friends?.filter((f) => 
    f.username.toLowerCase().includes(search.toLowerCase())
  ) || [];

  // Exclude people already in friends from search results
  const globalResults = searchResults?.filter(
    (u) => !friends?.some((f) => f._id === u._id)
  ) || [];

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl space-y-8 pb-20">
        <PageHeader
          title="Study Circle"
          description="Find other members and track your coding streaks together."
        />

        {/* Search Bar */}
        <div className="max-w-xl relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
            {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          </div>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-border/60 bg-card/40 pl-11 pr-4 py-3 font-mono text-sm text-foreground backdrop-blur-sm transition-all focus:bg-card/80 focus:ring-2 focus:ring-primary/20 outline-none border-dashed"
          />
        </div>

        {/* Global Search Results Section */}
        <AnimatePresence>
          {search.length >= 2 && globalResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 pt-4 border-t border-dashed border-border/40"
            >
              <h3 className="font-heading text-xs font-bold uppercase tracking-widest text-primary/80 px-1">Global Results</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {globalResults.map((user) => (
                  <UserCard 
                    key={user._id} 
                    user={user} 
                    isFriend={false} 
                    onAdd={() => addMutation.mutate(user._id)}
                    isAdding={addMutation.isPending && addMutation.variables === user._id}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Section with Tabs */}
        <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as any)} className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-1">
            <h3 className="font-heading text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              Your Circle
              <span className="font-mono text-[10px] text-muted-foreground/60 normal-case tracking-normal">({friends?.length || 0} members)</span>
            </h3>
            
            <TabsList className="bg-muted/30 border border-border/40 p-1 rounded-xl h-10 w-fit">
              <TabsTrigger 
                value="grid" 
                className="rounded-lg px-3 text-[10px] font-bold uppercase tracking-wider data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
              >
                <LayoutGrid className="h-3.5 w-3.5 mr-2" />
                Grid
              </TabsTrigger>
              <TabsTrigger 
                value="leaderboard" 
                className="rounded-lg px-3 text-[10px] font-bold uppercase tracking-wider data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
              >
                <List className="h-3.5 w-3.5 mr-2" />
                Leaderboard
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="grid" className="mt-0 space-y-4 outline-none">
            {isLoadingFriends ? (
              <div className="flex h-40 items-center justify-center rounded-2xl border border-dashed border-border/40 bg-muted/5">
                <Loader2 className="h-6 w-6 animate-spin text-primary/40" />
              </div>
            ) : friends && friends.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {(search.length < 2 ? friends : filteredFriends).map((user, i) => (
                  <UserCard key={user._id} user={user} isFriend={true} delay={i * 0.05} />
                ))}
              </div>
            ) : (
              <EmptyCircle />
            )}
          </TabsContent>

          <TabsContent value="leaderboard" className="mt-0 outline-none">
            {isLoadingFriends ? (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-16 w-full animate-pulse rounded-xl bg-muted/20" />
                ))}
              </div>
            ) : friends && friends.length > 0 ? (
              <FriendsLeaderboard users={search.length < 2 ? friends : filteredFriends} />
            ) : (
              <EmptyCircle />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

function EmptyCircle() {
  return (
    <div className="rounded-3xl border border-dashed border-border/60 bg-muted/5 px-4 py-16 text-center">
      <div className="mx-auto w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center mb-4 border border-primary/10">
        <Search className="h-6 w-6 text-primary/40" />
      </div>
      <p className="font-mono text-sm text-foreground font-bold">Your circle is empty</p>
      <p className="mt-2 font-mono text-[11px] text-muted-foreground max-w-xs mx-auto">
        Search for your friends by their name and add them to compare streaks.
      </p>
    </div>
  );
}

function FriendsLeaderboard({ users }: { users: FriendUser[] }) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2: return <Medal className="h-5 w-5 text-slate-300" />;
      case 3: return <Medal className="h-5 w-5 text-amber-600" />;
      default: return <span className="text-muted-foreground font-mono text-xs">{rank}</span>;
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1: return "bg-yellow-500/5 border-yellow-500/10";
      case 2: return "bg-slate-300/5 border-slate-300/10";
      case 3: return "bg-amber-600/5 border-amber-600/10";
      default: return "";
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-sm overflow-hidden"
    >
      <Table>
        <TableHeader className="bg-muted/30">
          <TableRow className="hover:bg-transparent border-border/40">
            <TableHead className="w-[80px] text-center">Rank</TableHead>
            <TableHead>User</TableHead>
            <TableHead className="text-right">Solved</TableHead>
            <TableHead className="text-right">Streak</TableHead>
            <TableHead className="text-right hidden sm:table-cell">Platforms</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <TableRow 
              key={user._id} 
              className={cn(
                "border-border/20 transition-colors duration-200 hover:bg-muted/20",
                getRankStyle(index + 1),
                user.isMe && "bg-primary/5 hover:bg-primary/10 border-l-2 border-l-primary"
              )}
            >
              <TableCell className="text-center font-bold">
                <div className="flex items-center justify-center">
                  {getRankIcon(index + 1)}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Link to={`/dashboard/${user._id}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <Avatar className="h-9 w-9 rounded-xl border border-border/40">
                      {user.profileImage && <AvatarImage src={user.profileImage} />}
                      <AvatarFallback className="bg-primary/10 text-primary uppercase font-bold text-[10px]">
                        {initials(user.username)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm flex items-center gap-1.5">
                        {user.username}
                        {user.isMe && <Badge variant="secondary" className="text-[8px] py-0 px-1 bg-primary/10 text-primary border-primary/20">YOU</Badge>}
                      </span>
                      <span className="text-[10px] text-muted-foreground font-mono hidden sm:block italic">
                        {index === 0 ? "Grandmaster" : index === 1 ? "Master" : index === 2 ? "Master" : "Challenger"}
                      </span>
                    </div>
                  </Link>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1.5">
                  <Target className="h-3 w-3 text-primary/70" />
                  <span className="font-heading font-bold">{user.problemsSolved}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1.5">
                  <Flame className={cn("h-3 w-3", user.streak > 0 ? "text-orange-500" : "text-muted-foreground/30")} />
                  <span className="font-mono text-xs font-bold">{user.streak}d</span>
                </div>
              </TableCell>
              <TableCell className="text-right hidden sm:table-cell">
                <div className="flex items-center justify-end gap-1">
                  {Object.entries(user.platformStats || {}).map(([platform, count]) => (
                    <Badge 
                      key={platform} 
                      variant="outline" 
                      className="bg-transparent text-[9px] py-0 px-1 border-border/30 font-mono"
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
    </motion.div>
  );
}

function UserCard({ 
  user, 
  isFriend, 
  onAdd, 
  isAdding,
  delay = 0 
}: { 
  user: any; 
  isFriend: boolean; 
  onAdd?: () => void;
  isAdding?: boolean;
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
    >
      <Card className="h-full rounded-3xl border-border/60 bg-card/40 backdrop-blur-xl transition-all hover:border-primary/30 hover:shadow-lg group">
        <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-3">
          <Link to={`/dashboard/${user._id}`} className="shrink-0 hover:opacity-80 transition-opacity">
            <Avatar className="h-12 w-12 rounded-2xl border border-border/40 ring-2 ring-transparent group-hover:ring-primary/10 transition-all shadow-sm">
              {user.profileImage && <AvatarImage src={user.profileImage} className="object-cover" />}
              <AvatarFallback className="rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 font-mono text-xs font-bold text-primary">
                {initials(user.username)}
              </AvatarFallback>
            </Avatar>
          </Link>
          
          <div className="min-w-0 flex-1">
            <Link to={`/dashboard/${user._id}`} className="hover:underline decoration-primary/30 underline-offset-4">
              <h4 className="truncate font-heading text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                {user.username}
              </h4>
            </Link>
            <p className="truncate font-mono text-[10px] text-muted-foreground/70">{user.email}</p>
          </div>

          {!isFriend && (
            <button
              onClick={onAdd}
              disabled={isAdding}
              className="h-10 w-10 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all disabled:opacity-50"
            >
              {isAdding ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
            </button>
          )}
          {isFriend && (
            <div className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]" title="Connected" />
          )}
        </CardHeader>

        <CardContent className="pt-1">
          <div className="grid grid-cols-2 gap-2 rounded-2xl border border-border/30 bg-muted/20 p-2.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-orange-400/10 flex items-center justify-center">
                <Flame className="h-3.5 w-3.5 text-orange-400" />
              </div>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-tighter text-muted-foreground">Streak</p>
                <p className="font-mono text-xs font-bold text-foreground">{user.streak || 0}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                <Trophy className="h-3.5 w-3.5 text-primary" />
              </div>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-tighter text-muted-foreground">Solved</p>
                <p className="font-mono text-xs font-bold text-foreground">{user.problemsSolved || 0}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
