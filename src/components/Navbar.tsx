import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Search } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/80 backdrop-blur-md px-4">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
        <div className="hidden sm:flex items-center gap-2 rounded-md border border-border bg-muted/50 px-3 py-1.5 text-sm text-muted-foreground">
          <Search className="h-3.5 w-3.5" />
          <span className="font-mono text-xs">Search...</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
        </button>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-xs font-bold text-primary font-mono">
            YU
          </div>
        </div>
      </div>
    </header>
  );
}
