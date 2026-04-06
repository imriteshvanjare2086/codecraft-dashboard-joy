import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Search, Command } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border/40 bg-background/60 backdrop-blur-2xl px-4">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground transition-colors" />
        <div className="hidden sm:flex items-center gap-2 rounded-xl border border-border/50 bg-muted/30 px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted/50 transition-colors cursor-pointer">
          <Search className="h-3.5 w-3.5" />
          <span className="font-mono text-xs">Search...</span>
          <kbd className="hidden md:inline-flex ml-4 h-5 items-center gap-0.5 rounded-md border border-border/60 bg-muted/50 px-1.5 text-[10px] font-mono text-muted-foreground">
            <Command className="h-2.5 w-2.5" />K
          </kbd>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="relative rounded-xl p-2 text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-all duration-200">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary animate-pulse" />
        </button>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary font-mono">
            YU
          </div>
        </div>
      </div>
    </header>
  );
}
