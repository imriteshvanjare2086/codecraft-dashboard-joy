import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/DashboardLayout";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Flame, Trophy, UserPlus, Search, Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { fetchFriends, searchUsers, addFriend, FriendUser } from "@/services/friends";
import { toast } from "sonner";
import { Link } from "react-router-dom";

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

        {/* My Friends Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-heading text-xs font-bold uppercase tracking-widest text-muted-foreground">Your Circle</h3>
            <span className="font-mono text-[10px] text-muted-foreground/60">{friends?.length || 0} members</span>
          </div>

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
            <div className="rounded-3xl border border-dashed border-border/60 bg-muted/5 px-4 py-16 text-center">
              <div className="mx-auto w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center mb-4 border border-primary/10">
                <Search className="h-6 w-6 text-primary/40" />
              </div>
              <p className="font-mono text-sm text-foreground font-bold">Your circle is empty</p>
              <p className="mt-2 font-mono text-[11px] text-muted-foreground max-w-xs mx-auto">
                Search for your friends by their name and add them to compare streaks.
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
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
